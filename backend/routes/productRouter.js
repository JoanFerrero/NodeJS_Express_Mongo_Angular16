const router = require('express').Router()

const productController = require('../controllers/productController')
const verifyJWT = require('../middleware/verifyJWT')
const verifyJWTOptional = require('../middleware/verifyJWTOptional')


router.post('/:slug', productController.create_product);
router.get('/', verifyJWTOptional , productController.find_product);
router.get('/category/:slug', productController.find_products_category);
router.get('/:slug', verifyJWTOptional , productController.findOneProduct);
router.get('/name/:search', productController.find_product_name);
router.put('/:slug/update', verifyJWT, productController.updateProduct);
router.post('/:slug/favorite', verifyJWT, productController.favoriteProduct);
router.delete('/:slug/favorite', verifyJWT, productController.unfavoriteProduct);
router.delete('/:slug', productController.delete_product);

module.exports = router;