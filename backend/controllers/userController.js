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
        return res.status(400).json({
            message: "User Exist"
        });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser =  await User.create({
        username,
        email,
        password,
    });

    return res.status(400).json({
        user: await userExist.toUserResponse()
    });
});