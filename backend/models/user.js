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

userSchema.methods.toProfileJSON = function (user) {
    return {
        username: this.username,
        bio: this.bio,
        image: this.image,
        //following: user ? user.isFollowing(this._id) : false
    }
};

userSchema.methods.favorite = function (id) {
    if(this.favouriteProduct.indexOf(id) === -1){
        this.favouriteProduct.push(id);
    }

    // const article = await Article.findById(id).exec();
    //
    // article.favouritesCount += 1;
    //
    // await article.save();

    return this.save();
}

userSchema.methods.unfavorite = function (id) {
    if(this.favouriteProduct.indexOf(id) !== -1){
        this.favouriteProduct.remove(id);
    }

    // const article = await Article.findById(id).exec();
    //
    // article.favouritesCount -= 1;
    //
    // await article.save();

    return this.save();
};

module.exports = mongoose.model('User', userSchema);