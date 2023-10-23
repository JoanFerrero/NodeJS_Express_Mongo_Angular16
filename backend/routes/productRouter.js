const router = require('express').Router()

const productController = require('../controllers/productController')
const verifyJWT = require('../middleware/verifyJWT')


router.post('/:slug', productController.create_product)
router.get('/', productController.find_product)
router.get('/category/:slug', productController.find_products_category)
router.get('/:slug', productController.findOneProduct)
router.get('/name/:search', productController.find_product_name)
router.post('/:slug/favorite', verifyJWT, productController.favoriteProduct)
router.delete('/:slug/favorite', verifyJWT, productController.unfavoriteProduct)
router.delete('/:slug', productController.delete_product)

module.exports = router;