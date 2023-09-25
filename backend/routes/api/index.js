var router = require('express').Router();

router.use('/products', require('./product.router'));
router.use('/categories', require('./category.routes'));

module.exports = router;