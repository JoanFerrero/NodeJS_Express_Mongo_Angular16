const router = require('express').Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser)
router.get('/user', verifyJWT, userController.getUser)

module.exports = router;