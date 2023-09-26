const Product = require('../models/product.model');
const Category = require('../models/category.model');
const asyncHandler = require('express-async-handler')

exports.create_product = asyncHandler(async (req, res) => {
    const { product_name, product_price} = req.body;

    const { slug } = req.params;
    
    if(!product_name || !product_price) {
        res.status(400).json({message: "All data is required"});
    }

    const category = await Category.findOne({slug}).exec();

    if(!category) {
        return res.status(401).json({
            message: "Category Not Forund"
        })
    };

    const newProduct =  await Product.create({
        product_name,
        product_price
    });

    await Category.updateOne({ slug: slug}, {$push: {products: newProduct._id}});

    //No funciona method cambiar
    //await category.addProducts(newProduct._id)

    res.json(newProduct);
})

exports.find_product = asyncHandler(async (req, res) => {
    const products = await Product.find()

    if(products.length === 0) {
        res.status(400).json({message: "There is no data"})
    }

    res.json(products)
})

exports.delete_product = asyncHandler(async (req, res) => {
    
})