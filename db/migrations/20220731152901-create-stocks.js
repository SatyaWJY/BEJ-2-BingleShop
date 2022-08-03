'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'stocks',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          allownull: false
        },
        item_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'items',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE' 
        },
        available_stock: {
          type: Sequelize.INTEGER
        },
        sold_stock: {
          type: Sequelize.INTEGER
        },
        created_at: {
          type: Sequelize.DATE,
          default: new Date()
        },
        updated_at: {
          type: Sequelize.DATE,
          default: new Date()
        },
        deleted_at: {
          type: Sequelize.DATE
        }
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('stocks');
  }
};
