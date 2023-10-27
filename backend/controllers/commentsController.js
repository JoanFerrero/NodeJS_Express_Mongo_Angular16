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

    await product.addComment(newComment._id);

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
        const loginUser = await User.findById(req.userId).exec();
        return await res.status(200).json({
            comments: await Promise.all(product.comments.map(async commentId => {
                const commentObj = await Comment.findById(commentId).exec();
                return await commentObj.toCommentResponse(loginUser);
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

exports.deleteComment = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const commenter = await User.findById(userId).exec();

    if (!commenter) {
        return res.status(401).json({
            message: "User Not Found"
        });
    }
    const { slug, id } = req.params;

    const product = await Product.findOne({slug: slug}).exec();

    if (!product) {
        return res.status(401).json({
            message: "Product Not Found"
        });
    }
    const comment = await Comment.findById(id).exec();

    if(comment.author.toString() === commenter._id.toString()) {
        await product.removeComment(comment._id);
        await Comment.deleteOne({_id: comment._id});
        return res.status(200).json({
            message: "Comment has been successfuly deleted!"
        });
    } else {
        return res.status(403).json({
            error: "Error Author - Comment"
        });
    }
})