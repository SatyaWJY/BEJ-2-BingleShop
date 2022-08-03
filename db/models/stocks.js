const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class Stocks extends Sequelize.Model{}

Stocks.init({
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
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
    available_stock: {
        type: Sequelize.DataTypes.INTEGER
    },
    sold_stock: {
        type: Sequelize.DataTypes.INTEGER
    }
}, {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'stocks'
})

module.exports = Stocks