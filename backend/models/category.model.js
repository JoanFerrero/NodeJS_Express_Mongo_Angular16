const mongoose = require('mongoose')
const slug = require('slug')
const uniqueValidator = require('mongoose-unique-validator');
    
const category_schema = new mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    category_name: {type: String, require: true},
    products: [{ type: mongoose.Schema.Types.ObjectId, red: "Product" }]
});

category_schema.plugin(uniqueValidator, { msg: "already taken" });

category_schema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true, replacement: '-'});
    next();
});//pre

category_schema.methods.slugify = function () {
    this.slug = slug(this.category_name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};//slugify

module.exports = mongoose.model('Category', category_schema);