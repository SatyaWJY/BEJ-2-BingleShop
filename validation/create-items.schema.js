const Joi = require("joi");

const createItemSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required()
})

module.exports = createItemSchema