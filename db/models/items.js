const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class Items extends Sequelize.Model {}

Items.init({
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.DataTypes.STRING
    },
    description: {
        type: Sequelize.DataTypes.TEXT
    },
    quantity: {
        type: Sequelize.DataTypes.INTEGER
    },
    price: {
        type: Sequelize.DataTypes.INTEGER
    },
}, {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'items'
})

module.exports = Items