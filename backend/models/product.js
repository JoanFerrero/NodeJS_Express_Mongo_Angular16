const mongoose = require('mongoose')
const slugify = require('slugify')
const uniqueValidator = require('mongoose-unique-validator');
    
const productSchema = new mongoose.Schema({
    slug: {
        type: String, 
        lowercase: true, 
        unique: true
    },
    product_name: {
        type: String, 
        require: true
    },
    product_price: {
        type: Number, 
        require: true
    },
    product_img: [String],
    id_category: {
        type: String, 
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    favouritesCount: {
        type: Number,
        default: 0
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        red: "Coment" 
    }]
});

productSchema.plugin(uniqueValidator, { msg: "already taken" });

productSchema.pre('save', function (next) {
    if(!this.slug){
        this.slug = slugify(this.product_name, { lower: true, replacement: '-'});
    }
    next();
});//pre

productSchema.methods.toProductResponse = async function () {
    return {
        slug: this.slug,
        product_name: this.product_name,
        product_price: this.product_price,
        product_img: this.product_img,
        id_category: this.id_category
    }
}

productSchema.methods.toCarouselResponse = async function () {
    return {
        slug: this.slug,
        img: this.product_img
    }
}

productSchema.methods.toNameJSONFor = function () {
    return {
      name: this.product_name,
    };
};

productSchema.methods.addComment = function (commentId) {
    if(this.comments.indexOf(commentId) === -1){
        this.comments.push(commentId);
    }
    return this.save();
};

productSchema.methods.removeComment = function (commentId) {
    if(this.comments.indexOf(commentId) !== -1){
        this.comments.remove(commentId);
    }
    return this.save();
};

module.exports = mongoose.model('Product_1', productSchema);