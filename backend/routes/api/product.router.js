const router = require('express').Router()

router.post('/')
router.get('/')
router.get('/category/:slug')
router.get('/:slug')
router.put('/:slug')
router.delete(':/slug')

module.exports = router;