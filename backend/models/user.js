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
    image: {
        type: String,
        default: "https://static.productionready.io/images/smiley-cyrus.jpg"
    }}, { timestamps: true }
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
}

userSchema.methods.toUserResponse = function() {
    return {
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        token: this.generateAccessToken()
    }
};

module.exports = mongoose.model('User', userSchema);