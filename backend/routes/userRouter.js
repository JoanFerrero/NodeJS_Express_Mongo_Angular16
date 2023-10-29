const router = require('express').Router()
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const verifyJWT = require('../middleware/verifyJWT')

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/user', verifyJWT, userController.getUser);
router.get('/user/likes', verifyJWT, productController.get_likes);
router.put('/user', verifyJWT, userController.updateUser);

module.exports = router;