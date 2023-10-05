const Product = require('../models/product');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler')

exports.create_product = asyncHandler(async (req, res) => {
    const { product_name, product_img, product_price} = req.body;

    const { slug } = req.params;
    
    if(!product_name || !product_img || !product_price) {
        return res.status(400).json({
            message: "All data is required"
        });
    }

    const categoryFind = await Category.findOne({slug}).exec();

    if(!categoryFind) {
        return res.status(401).json({
            message: "Category Not Forund"
        })
    };

    const newProduct =  await Product.create({
        product_name,
        product_price,
        product_img
    });

    await categoryFind.addProduct(newProduct._id);

    return res.status(200).json({
        product: await newProduct.toProductResponse()
    });
})

exports.find_product = asyncHandler(async (req, res) => {
    let query = {};
    let transUndefined = (varQuery, otherResult) => {
        return varQuery != "undefined" && varQuery ? varQuery : otherResult;
    };

    let name = transUndefined(req.query.name, "");
    let nameReg = new RegExp(name);

    query = {
        product_name: { $regex: nameReg }
    }

    const products = await Product.find(query);

    if(products.length === 0) {
        res.status(200).json({message: "There is no data"})
    }

    return await res.status(200).json({
        product: await Promise.all(products.map(async product => {
            return await product.toProductResponse();
        }))
    });
})

exports.findOneProduct = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const productOne = await Product.findOne({slug}).exec();

    if(!productOne) {
        return res.status(400).json({
            message: "Product is Not Found"
        });
    }

    return res.status(200).json({
        product: await productOne.toProductResponse()
    });
})

exports.find_products_category = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const category = await Category.findOne({slug}).exec();

    if(!category) {
        return res.status(401).json({
            message: "Category Not Found"
        })
    }

    return await res.status(200).json({
        product: await Promise.all(category.products.map(async productId => {
            const productObj = await Product.findById(productId).exec();
            return await productObj.toProductResponse();
        }))
    });
})

exports.find_product_name = asyncHandler(async (req, res) => {
    let search = new RegExp(req.params.search);

    const product = await Product.find({ product_name: { $regex: search } });

    if(!product) {
        return res.status(401).json({
            message: "Product Not Found"
        })
    }

    res.json(product.map((product) => product.toNameJSONFor()));

})
  

exports.delete_product = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const product = await Product.findOne({slug: slug}).exec();

    if(!product) {
        return res.status(401).json({
            message: "Product Not Forund"
        })
    }

    //await categoryFind.removeProduct(product._id)
    await Product.deleteOne({slug: slug})
    res.status(200).json({
        message: "Product succesfully deleted!"
    })
})