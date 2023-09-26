const router = require('express').Router()

const categoryController = require('../controllers/categoryController')

router.post('/', categoryController.create_category)
router.get('/', categoryController.find_category)
router.delete('/:slug', categoryController.delete_category)

module.exports = router;