const mongoose = require('mongoose')
const slugify = require('slugify')
const uniqueValidator = require('mongoose-unique-validator');
    
const categorySchema = new mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    category_name: {type: String, require: true},
    description: {type: String, require: true},
    products: [{ type: mongoose.Schema.Types.ObjectId, red: "Product" }]
});

categorySchema.plugin(uniqueValidator, { msg: "already taken" });

categorySchema.pre('save', function (next) {
    this.slug = slugify(this.category_name, { lower: true, replacement: '-'});
    next();
});

categorySchema.methods.addProduct = function (productId) {
    if(this.products.indexOf(productId) === -1) {
        this.products.push(productId);
    }
    return this.safe();
};

module.exports = mongoose.model('Category', categorySchema);