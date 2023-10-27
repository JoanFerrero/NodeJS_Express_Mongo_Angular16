const mongoose = require('mongoose')
const slugify = require('slugify')
const uniqueValidator = require('mongoose-unique-validator');
const User = require('./user')
    
const commentSchema = new mongoose.Schema({
    body: {
        type: String
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        red: "User" 
    },
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        red: "Product_1"
    }
});

commentSchema.methods.toCommentResponse = async function (user) {
    const authorObj = await User.findById(this.author).exec();
    return {
        id: this._id,
        body: this.body,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        author: authorObj.toProfileJSON(user)
    }
};


module.exports = mongoose.model('Comment', commentSchema);