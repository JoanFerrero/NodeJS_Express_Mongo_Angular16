const Product = require('../models/product');
const User = require('../models/user');
const Comment = require('../models/comment')
const asyncHandler = require('express-async-handler');

exports.addCommentAuthor = asyncHandler(async (req, res) => {
    const id = req.userId;

    const commenter = await User.findById(id).exec();

    if (!commenter) {
        return res.status(401).json({
            message: "User Not Found"
        });
    }

    const { slug } = req.params;

    const product = await Product.findOne({slug: slug}).exec();

    if(!product) {
        res.status(401).json({
            message: 'Product not Found'
        });
    }

    //acabar

    const comment = req.body.comment;

    if(!comment) {
        res.status(401).json({
            message: 'Comment not Found'
        });
    }

    const newComment =  await Comment.create({
        body: comment,
        author: commenter._id,
        product: product._id
    });

    //Falta añadir el commentario al producto con el metodo
    // ->
    await product.addComment(newComment._id)

    return res.status(200).json({
        comment: await newComment.toCommentResponse(commenter)
    })
})

exports.getCommentsProduct = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const product = await Product.findOne({slug: slug}).exec();

    if(!product) {
        res.status(401).json({
            message: 'Product not Found'
        });
    }

    const loggedin = req.loggedin;

    if(loggedin) {
        return await res.status(200).json({
            comments: await Promise.all(product.comments.map(async commentId => {
                const commentObj = await Comment.findById(commentId).exec();
                return await commentObj.toCommentResponse(loggedin);
            }))
        })
    } else {
        return await res.status(200).json({
            comments: await Promise.all(product.comments.map(async commentId => {
                const commentObj = await Comment.findById(commentId).exec();
                return await commentObj.toCommentResponse(false);
            }))
        })
    }
})