const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require("jsonwebtoken");
    
const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        require: true, 
        unique: true},
    password: {
        type: String, 
        require: true
    },
    email: {
        type: String, 
        require: true, 
        unique: true
    },
    bio: {
        type: String, 
        default: ""
    },
    favouriteProduct: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product_1'
    }],
    image: {
        type: String,
        default: "https://static.productionready.io/images/smiley-cyrus.jpg"
    },
    followersUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followingUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]},
    { timestamps: true }
);

userSchema.plugin(uniqueValidator, { msg: "is already taken" });

userSchema.methods.generateAccessToken = function() {
    const accessToken = jwt.sign({
            "user": {
                "id": this._id,
                "email": this.email,
                "password": this.password
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d"}
    );
    return accessToken;
};

userSchema.methods.toUserResponse = function() {
    return {
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        favouriteProduct: this.favouriteProduct,
        followersUsers: this.followersUsers,
        followingUsers: this.followingUsers,
        token: this.generateAccessToken()
    }
};

userSchema.methods.toProfileJSON = function (user) {
    return {
        username: this.username,
        bio: this.bio,
        image: this.image,
        following: user ? user.isFollowing(this._id) : false
    }
};

userSchema.methods.isFollowing = function (id) {
    const idStr = id.toString();
    for (const followingUser of this.followingUsers) {
        if (followingUser.toString() === idStr) {
            return true;
        }
    }
    return false;
};

userSchema.methods.favorite = function (id) {
    if(this.favouriteProduct.indexOf(id) === -1){
        this.favouriteProduct.push(id);
    }
    return this.save();
};

userSchema.methods.unfavorite = function (id) {
    if(this.favouriteProduct.indexOf(id) !== -1){
        this.favouriteProduct.remove(id);
    }
    return this.save();
};

userSchema.methods.isFavourite = function (id) {
    const idStr = id.toString();
    for (const article of this.favouriteProduct) {
        if (article.toString() === idStr) {
            return true;
        }
    }
    return false;
};

userSchema.methods.follow = function (id) {
    if(this.followingUsers.indexOf(id) === -1){
        this.followingUsers.push(id);
    }
    return this.save();
};

userSchema.methods.unfollow = function (id) {
    if(this.followingUsers.indexOf(id) !== -1){
        this.followingUsers.remove(id);
    }
    return this.save();
};

userSchema.methods.followers = function (id) {
    if(this.followersUsers.indexOf(id) === -1){
        this.followersUsers.push(id);
    }
    return this.save();
}

userSchema.methods.unfollowers = function (id) {
    if(this.followersUsers.indexOf(id) !== -1){
        this.followersUsers.push(id);
    }
    return this.save();
}


module.exports = mongoose.model('User', userSchema);