const Product = require('../models/product');
const User = require('../models/user');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler')

exports.create_product = asyncHandler(async (req, res) => {
    const { product_name, product_img, product_price, id_category} = req.body;

    const { slug } = req.params;
    
    if(!product_name || !product_img || !product_price || !id_category) {
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
        product_img,
        id_category
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
    let min_price = transUndefined(req.query.min_price, 0);
    let max_price = transUndefined(req.query.max_price, Number.MAX_SAFE_INTEGER);
    let categoryName = transUndefined(req.query.category, "");
    let limit = transUndefined(req.query.limit, 0);
    let offset = transUndefined(req.query.offset, 0);
    let nameReg = new RegExp(name);

    query = {
        product_name: { $regex: nameReg },
        $and: [{ product_price: { $gte: min_price } }, { product_price: { $lte: max_price } }],
    }

    if(categoryName) {
        query.id_category = categoryName;
    }

    const products = await Product.find(query).limit(Number(limit)).skip(Number(offset));
    const product_count = await Product.find(query).countDocuments();

    if(products.length === 0) {
        res.status(200).json({message: "There is no data"})
    }

    if (req.loggedin) {
        const loginUser = await User.findById(req.userId).exec();
        return await res.status(200).json({
            product: await Promise.all(products.map(async product => {
                return await product.toProductResponse(loginUser);
            })),  product_count: product_count
        });
    } else {
        return await res.status(200).json({
            product: await Promise.all(products.map(async product => {
                return await product.toProductResponse();
            })),  product_count: product_count
        });
    }
})

exports.findOneProduct = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const productOne = await Product.findOne({slug}).exec();

    if(!productOne) {
        return res.status(400).json({
            message: "Product is Not Found"
        });
    }
    if (req.loggedin) {
        const loginUser = await User.findById(req.userId).exec();
        return res.status(200).json({
            product: await productOne.toProductResponse(loginUser)
        });
    } else {
        return res.status(200).json({
            product: await productOne.toProductResponse()
        });
    }
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

exports.updateProduct = asyncHandler(async (req, res) => {
    const  userId  = req.userId;

    const { slug } = req.params;

    const loginUser = await User.findById(userId).exec();

    const target = await Product.findOne({ slug: slug }).exec();

    // console.log(target.title);
    // console.log(req.userId);
    target.author = userId;
    

    await target.save();
    return res.status(200).json({
        product: await target.toProductResponse(loginUser)
    })
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

exports.favoriteProduct = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const { slug } = req.params;

    const loginUser = await User.findById(userId).exec();

    if(!loginUser) {
        return res.status(401).json({
            message: "User Not Found"
        })
    }

    const product = await Product.findOne({slug: slug}).exec();

    if(!product) {
        return res.status(401).json({
            message: "Product Not Found"
        })
    }

    await loginUser.favorite(product._id);

    const updatedProduct = await product.updateFavoriteCount();

    return res.status(200).json({
        product: await updatedProduct.toProductResponse()
    })
})

exports.unfavoriteProduct = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const { slug } = req.params;

    const loginUser = await User.findById(userId).exec();

    if(!loginUser) {
        return res.status(401).json({
            message: "User Not Found"
        })
    }

    const product = await Product.findOne({slug: slug}).exec();

    if(!product) {
        return res.status(401).json({
            message: "Product Not Found"
        })
    }

    await loginUser.unfavorite(product._id);

    const updatedProduct = await product.updateFavoriteCount();

    return res.status(200).json({
        product: await updatedProduct.toProductResponse()
    })
})

exports.get_user_products = asyncHandler(async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username }).exec();

    if(!user) {
        return res.status(401).json({
            message: "User Not Found"
        })
    }

    const products = await Product.find({ author: user._id }).exec();
    const product_count = await Product.find({ author: user._id }).countDocuments();

    return await res.status(200).json({
        product: await Promise.all(products.map(async product => {
            return await product.toProductResponse(user);
        })),  product_count: product_count
    });
})//get_user_products

exports.get_likes = asyncHandler(async (req, res) => {
    const email = req.userEmail;    

    const user = await User.findOne({ email }).populate({ path: 'favouriteProduct', populate: { path: 'author'} }).exec();
    const user_toLike = await User.findOne({ email }).exec()

    if(!user) {
        return res.status(401).json({
            message: "User Not Found"
        })
    }

    return await res.status(200).json({
        product: await Promise.all(user.favouriteProduct.map(async product => {
            return await product.toProductResponse(user_toLike);
        }))
    });
})//get_user_products

async function get_likes(req, res) {
    try {
        const user = await User.findOne({ id: req.auth.id }).populate({ path: 'favouriteProduct', populate: { path: 'author', select: 'username image -_id' } });
        const user_toLike = await User.findOne({ id: req.auth.id });
        if (user) {
            res.json(user.likes.map(m => m.toLikeJSON(user_toLike)));
        } else {
            res.status(404).json(FormatError("User not found", res.statusCode))
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}//get_likes