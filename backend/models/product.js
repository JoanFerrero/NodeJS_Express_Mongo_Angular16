const mongoose = require('mongoose')
const slugify = require('slugify')
const uniqueValidator = require('mongoose-unique-validator');
    
const category_schema = new mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    product_name: {type: String, require: true},
    product_price: {type: Number, require: true}
});

category_schema.plugin(uniqueValidator, { msg: "already taken" });

category_schema.pre('save', function (next) {
    if(!this.slug){
        this.slug = slugify(this.product_name, { lower: true, replacement: '-'});
    }
    next();
});//pre

category_schema.methods.toProductResponse = async function () {
    return {
        slug: this.slug,
        product_name: this.product_name,
        product_price: this.product_price
    }
}

module.exports = mongoose.model('Product_1', category_schema);