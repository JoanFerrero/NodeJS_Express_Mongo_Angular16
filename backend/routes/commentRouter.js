const router = require('express').Router()
const commentController = require('../controllers/commentsController')
const verifyJWT = require('../middleware/verifyJWT')
const VerifyOptional = require('../middleware/verifyJWTOptional')

router.post('/:slug/comment', verifyJWT, commentController.addCommentAuthor);

router.get('/:slug/comment', VerifyOptional, commentController.getCommentsProduct);

module.exports = router;