const User = require('../models/user');
const asyncHandler = require('express-async-handler');

exports.getProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const loggedin = req.loggedin;

    const user = await User.findOne({ username: username }).exec();

    if(!user) {
        return res.status(401).json({
            message: "User Not Found"
        })
    }

    if(loggedin) {
        const loginUser = await User.findOne({ email: req.userEmail}).exec();
        return res.status(200).json({
            profile: user.toProfileJSON(loginUser)
        })
    } else {
        return res.status(200).json({
            profile: user.toProfileJSON(false)
        })
    }
})

exports.getfollowingUsers = asyncHandler(async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username: username }).exec();

    if(!user) {
        return res.status(401).json({
            message: "User Not Found"
        })
    }
    
    return await res.status(200).json({
        users: await Promise.all(user.followingUsers.map(async userId => {
            const userObj = await User.findById(userId).exec();
            return await userObj.toUserResponse();
        }))
    });
})

exports.getFollowUsers = asyncHandler(async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username: username }).exec();

    if(!user) {
        return res.status(401).json({
            message: "User Not Found"
        })
    }
    
    return await res.status(200).json({
        users: await Promise.all(user.followersUsers.map(async userId => {
            const userObj = await User.findById(userId).exec();
            return await userObj.toUserResponse();
        }))
    });
})

exports.followUser = asyncHandler(async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username: username }).exec();
    const loginUser = await User.findOne({ email: req.userEmail }).exec();

    if(!user || !loginUser) {
        return res.status(401).json({
            message: "User Not Found"
        })
    }

    await loginUser.follow(user._id);
    await user.followers(loginUser._id);

    return res.status(200).json({
        profile: user.toProfileJSON(loginUser)
    })
})

exports.unFollowUser = asyncHandler(async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username: username }).exec();
    const loginUser = await User.findOne({ email: req.userEmail }).exec();

    if(!user || !loginUser) {
        return res.status(401).json({
            message: "User Not Found"
        })
    }

    await loginUser.unfollow(user._id);
    await user.unfollowers(loginUser._id);

    return res.status(200).json({
        profile: user.toProfileJSON(loginUser)
    })
})