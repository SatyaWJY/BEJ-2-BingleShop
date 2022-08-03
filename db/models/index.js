const Users = require('./users')
const Items = require('./items')
const Orders = require('./orders')
const Order_items = require('./order_items')
const Stocks = require('./stocks')
const sequelize = require('./sequelize')

Users.hasMany(Orders, {
    as: 'user_orders',
    foreignKey: 'user_id',
})

Orders.belongsTo(Users, {
    as: 'order',
    foreignKey: 'user_id',
})

Items.hasMany(Order_items, {
    as: 'items',
    foreignKey: 'item_id',
    })

Order_items.belongsTo(Items, {
    as: 'item_order',
    foreignKey: 'item_id',
})

Orders.hasMany(Order_items, {
    as: 'orders',
    foreignKey: 'order_id',
})

Order_items.belongsTo(Orders, {
    as: 'order_item',
    foreignKey: 'order_id',
})

Items.hasOne(Stocks, {
    as: 'item_stock',
    foreignKey: 'item_id',
})

Stocks.belongsTo(Items, {
    as: 'stock',
    foreignKey: 'item_id',
})

module.exports = {
    sequelize,
    Users,
    Items,
    Orders,
    Order_items,
    Stocks
}