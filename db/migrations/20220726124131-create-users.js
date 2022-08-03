'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          allownull: false
        },
        name: {
          type: Sequelize.STRING,
          allownull: false
        },
        email: {
          type: Sequelize.STRING,
          allownull: false
        },
        phone: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
          allownull: false
        },
        address: {
          type: Sequelize.TEXT,
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
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
