const {sequelize, Items, Stocks} = require('../db/models')

const getItem = async (req, res, next) => {
    try {
        const findAllItem = await Items.findAll({
            include: [{
                model: Stocks,
                as: 'item_stock'
            }]
    })
        console.log(findAllItem.length);
        if (findAllItem.length > 0) {
            return res.status(200).json({
            message: 'success show items',
            data: findAllItem    
        })
        }
        throw({
            code: 404,
            message: 'item is not found'
        })
        
    } catch (error) {
        next(error)
    }
}

const updateItem = async(req, res, next) => {
    const id = req.params.id
    try {
        const findOneItem = await Items.findByPk(id)
        if (findOneItem) {
            await findOneItem.update(req.body)
            return res.status(200).json({
                message: 'Update item success'
            })
        }

        throw({
            code:404,
            message:'Items is not found'
        })
    } catch (error) {
        next(error)
    }
}

const createItem = async (req, res, next) => {
    try {
        const {...createItem} = req.body
        
        await sequelize.transaction(async trx => {
            const item = await Items.create({
                ...createItem
            }, {
                transaction: trx
            })

            await Stocks.create({
                item_id: item.id,
                available_stock: createItem.quantity,
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

const deleteItem = async(req, res, next) => {
    const id = req.params.id
    try {
        const findOneItem = await Items.findByPk(id)
        if (findOneItem) {
            await findOneItem.destroy()
            return res.status(200).json({
                message: 'delete item success'
            })
        }

        throw({
            code:404,
            message:'Items is not found'
        })
    } catch (error) {
        next(error)
    }
}

const getOneItem = async (req, res, next) => {
    try {
        const id = req.params.id
        const findItem = await Items.findByPk(id, {
            include: [{
                model: Stocks,
                as: 'item_stock'
            }]
    })
        if (findItem) {
            return res.status(200).json({
            message: 'success show items',
            data: findItem    
        })
        }
        throw({
            code: 404,
            message: 'item is not found'
        })
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createItem,
    getItem,
    updateItem,
    deleteItem,
    getOneItem
}