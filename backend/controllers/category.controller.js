const Category = require('../models/category.model');
const asyncHandler = require('express-async-handler')

exports.create_category = asyncHandler(async (req, res) => {
    const { category_name, description} = req.body;

    if(!category_name || !description) {
        res.status(400).json({message: "All data is required"});
    }

    const category = await Category.create({ category_name, description});
    const new_category = await category.save()
    res.json(new_category)
})

exports.find_category = asyncHandler(async (req, res) => {
    const categories = await Category.find()

    if(categories.length === 0) {
        res.status(400).json({message: "There is no data"})
    }

    res.json(categories)
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