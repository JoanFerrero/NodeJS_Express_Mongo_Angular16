const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/user')

exports.registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if( !username || !password || !email) {
        return res.status(400).json({
            message: "All data is required"
        });
    }

    const userExist = await User.findOne({$or: [{ username: username }, { email: email }]});

    if(userExist) {
        return res.status(401).json({
            message: "User exist"
        });
    };

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser =  await User.create({
        username,
        email,
        password: hashedPwd,
    });

    return res.status(200).json({
        user: await newUser.toUserResponse()
    });
});

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return req.status(400).json({
            message: "All data is required"
        });
    };

    const userExist = await User.findOne({ email: email });

    if(!userExist) {
        return res.status(401).json({
            message: "User not exist"
        });
    };

    const match = await bcrypt.compare(password, userExist.password);

    if (!match) return res.status(401).json({ message: 'Unauthorized: Wrong password' });

    return res.status(200).json({
        user: userExist.toUserResponse()
    });
});

exports.getUser = asyncHandler(async (req, res) => {
    const email = req.userEmail;

    const userExist = await User.findOne({ email: email });

    if(!userExist) {
        return res.status(401).json({
            message: "User not exist"
        });
    };

    return res.status(200).json({
        user: userExist.toUserResponse()
    });
});

exports.updateUser = asyncHandler(async (req, res) => {
    const { user } = req.body;

    const email = req.userEmail;    

    const target = await User.findOne({ email }).exec();

    if (user.password) {
        const hashedPwd = await bcrypt.hash(user.password, 10);
        target.password = hashedPwd;
    }

    if(typeof user.bio !== 'undefined') {
        target.bio = user.bio;
    };

    if(typeof user.image !== 'undefined') {
        target.image = user.image;
    };

    await target.save();

    return res.status(200).json({
        user: target.toUserResponse()
    });
});