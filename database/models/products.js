'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {

    static associate(models) {

    }
  }
  products.init({
    product_name: DataTypes.STRING,
    product_desc: DataTypes.STRING,
    id_category: DataTypes.INTEGER,
    sku: DataTypes.INTEGER,
    cost: DataTypes.DECIMAL,
    price: DataTypes.DECIMAL,
    stock_qty: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};