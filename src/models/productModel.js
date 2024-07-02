'use strict';
import { Model, DataTypes } from 'sequelize';

class Product extends Model {

    static associate(models) {

    }

    static async deleteProductById(id_product) {
        return await Product.destroy({ where: { id_product } });
    }

    static async updateProductById(product, productId) {
        return await Product.update({ ...product },
            {
                where: { id_product: productId, },
            },
        );
    }
}
const initProductModel = (sequelize) => {
    Product.init({
        id_product: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_desc: DataTypes.STRING,
        id_category: DataTypes.INTEGER,
        sku: DataTypes.INTEGER,
        cost: DataTypes.DECIMAL,
        price: DataTypes.DECIMAL,
        image: DataTypes.STRING,
        stock_qty: DataTypes.INTEGER,
        is_active: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'products',
    });
    return Product;
};

export { initProductModel };
