const category = require('../models/category');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler')

exports.create_category = asyncHandler(async (req, res) => {
    const { category_name, description} = req.body;

    if(!category_name || !description) {
        res.status(400).json({message: "All data is required"});
    }

    const category = await Category.create({ category_name, description});
    const new_category = await category.save();

    return res.status(200).json({
        category: await new_category.toCategoryResponse()
    });
})

exports.find_category = asyncHandler(async (req, res) => {
    const categories = await Category.find()

    if(!categories) {
        return res.status(400).json({
            message: "There is no data"
        })
    };
    return await res.status(200).json({
        category: await Promise.all(categories.map(async category => {
            return await category.toCategoryResponse();
        }))
    });
})

exports.delete_category = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const category = await Category.findOne({slug}).exec();

    if(!category) {
        return res.status(401).json({
            message: "Category Not Forund"
        })
    }

    await Category.deleteOne({slug: slug})
    res.status(200).json({
        message: "Category succesfully deleted!"
    })
})