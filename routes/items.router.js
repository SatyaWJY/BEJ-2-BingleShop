const { createItem } = require('../controllers/items.controller')

const validation = require('../middlewares/validation.middleware')

const createItemSchema = require('../validation/create-items.schema')

const router = require('express').Router()

router.post('', validation(createItemSchema), createItem)

module.exports = router