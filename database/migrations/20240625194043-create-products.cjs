'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id_product: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      product_desc: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_category: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      sku: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      cost: {
        allowNull: true,
        type: Sequelize.DECIMAL
      },
      price: {
        allowNull: true,
        type: Sequelize.DECIMAL
      },
      stock_qty: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};