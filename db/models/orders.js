const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class Orders extends Sequelize.Model{}

Orders.init({
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    date: {
        type: Sequelize.DataTypes.DATE
    },
    status: {
        type: Sequelize.DataTypes.STRING
    },
}, {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'orders'
})

module.exports = Orders