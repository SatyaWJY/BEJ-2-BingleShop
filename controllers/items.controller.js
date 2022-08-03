const {sequelize, Items, Stocks} = require('../db/models')

const createItem = async (req, res, next) => {
    try {
        const {quantity, ...createItem} = req.body
        
        await sequelize.transaction(async trx => {
            const item = await Items.create({
                ...createItem
            }, {
                transaction: trx
            })

            await Stocks.create({
                item_id: item.id,
                available_stock: quantity,
                sold_stock: 0
            }, {
                transaction: trx
            })
        })

        return res.status(200).json({
            message: 'success create item'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createItem
}