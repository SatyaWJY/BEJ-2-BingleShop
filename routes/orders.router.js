const { createOrder } = require('../controllers/orders.controller')
const { authorization } = require('../middlewares/authorization.middleware')
const createOrderSchema = require('../validation/create-orders.schema')

const validation = require('../middlewares/validation.middleware')

const router = require('express').Router()

router.post('', authorization('user'), validation(createOrderSchema), createOrder)

module.exports = router
