const { Op } = require('sequelize')
const {Items, sequelize, Stocks, Orders, Order_items} = require('../db/models')

const createOrder = async(req, res, next) => {
    try {
        const {items} = req.body

        const itemIds = items.map(item => item.item_id)

        const existItems = await Items.findAll({
            where: {
                id: {
                    [Op.in]: itemIds
                }
            },
            include: [
                {
                    model: Stocks,
                    as: 'item_stock'
                }
            ]
        })

        if (existItems.lenght !== items.lenght) {
            throw {
                code: 400,
                message: 'some item not found'
            }
        }

        await sequelize.transaction(async trx => {
            const order = await Orders.create({
                user_id: req.user_id,
                date: new Date(),
                status: 'BUY'
            }, {
                transaction: trx
            })
        
        await Promise.all(
            existItems.map(async item => {
                const selectedPayload = items.find(val => val.item_id === item.id)

                await Stocks.update({
                    available_stock: item.item_stock.available_stock - selectedPayload.quantity,
                    sold_stock: selectedPayload.quantity
                }, {
                    where: {
                        item_id: item.id
                    },
                    transaction: trx
                })
                
                await Order_items.create({
                    order_id: order.id,
                    item_id: item.id,
                    qty_order: selectedPayload.quantity,
                    total_price: selectedPayload.quantity * item.price
                }, {
                    transaction: trx
                })
            })
        )
        })

        return res.status(200).json({
            message: 'success create order'
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    createOrder
}