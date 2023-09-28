const router = require('express').Router()

const productController = require('../controllers/productController')


router.post('/:slug', productController.create_product)
router.get('/', productController.find_product)
router.get('/category/:slug', productController.find_products_category)
router.get('/:slug')
router.put('/:slug')
router.delete(':/slug')

module.exports = router;