const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class Order_items extends Sequelize.Model{}

Order_items.init({
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    order_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
            model: 'orders',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    item_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
            model: 'items',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    qty_order: {
        type: Sequelize.DataTypes.INTEGER
    },
    total_price: {
        type: Sequelize.DataTypes.INTEGER
    },
}, {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'order_items' 
})

module.exports = Order_items