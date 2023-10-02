const Category = require('../models/category');
const asyncHandler = require('express-async-handler')

exports.create_category = asyncHandler(async (req, res) => {
    const { category_name, category_img, description} = req.body;

    if(!category_name || !category_img || !description) {
        res.status(400).json({message: "All data is required"});
    }

    const category = await Category.create({ category_name,category_img, description});
    const new_category = await category.save();

    return res.status(200).json({
        category: await new_category.toCategoryResponse()
    });
})

exports.find_category = asyncHandler(async (req, res) => {
    const { offset, limit } = req.query;

    const categories = await Category.find({}, {}, { skip: Number(offset), limit: Number(limit) })

    if(categories.length === 0) {
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