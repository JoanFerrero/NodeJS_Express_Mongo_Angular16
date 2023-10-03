const Category =  require('../models/category')
const Product = require('../models/product')
const asyncHandler = require('express-async-handler');

exports.find_carousel_product = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const productOne = await Product.findOne({slug}).exec();

    if(productOne.length === 0) {
        return res.status(400).json({
            message: "There is no data"
        })
    };

    return res.status(200).json({
        product: await productOne.toCarouselResponse()
    });
})

exports.find_carousel_category = asyncHandler(async (req, res) => {

    const categories = await Category.find()

    if(categories.length === 0) {
        return res.status(400).json({
            message: "There is no data"
        })
    };

    return await res.status(200).json({
        category: await Promise.all(categories.map(async category => {
            return await category.toCarouselResponse();
        }))
    });
})