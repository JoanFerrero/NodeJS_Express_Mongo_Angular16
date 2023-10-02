const router = require('express').Router()

const carouselController = require('../controllers/carouselController')

router.get('/category', carouselController.find_carousel_category)
router.get('/product', carouselController.find_carousel_product)

module.exports = router;