'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'order_items',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          allownull: false
        },
        order_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'orders',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
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
        qty_order: {
          type: Sequelize.INTEGER
        },
        total_price: {
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
    await queryInterface.dropTable('order_items');
  }
};
