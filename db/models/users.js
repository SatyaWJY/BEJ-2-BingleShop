const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class Users extends Sequelize.Model {}

Users.init({
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.DataTypes.STRING
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.DataTypes.TEXT
    },
}, {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'users'
})

module.exports = Users