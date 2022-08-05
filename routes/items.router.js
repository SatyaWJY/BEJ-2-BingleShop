const { createItem, getItem, updateItem, deleteItem, getOneItem } = require('../controllers/items.controller')

const validation = require('../middlewares/validation.middleware')

const createItemSchema = require('../validation/create-items.schema')

const router = require('express').Router()

router.post('', validation(createItemSchema), createItem)
router.get('', getItem)
router.patch('/:id', updateItem)
router.delete('/:id', deleteItem)
router.get('/:id', getOneItem)

module.exports = router