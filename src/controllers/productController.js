import { sequelize } from '../db/database.js';
import { initProductModel } from '../models/productModel.js';

const Product = initProductModel(sequelize);

export class ProductController {

    static async postProduct(req, res) {
        try {
            const product = Product.create(req.body);
            return res.status(200).json({ success: true, data: product });
        } catch (error) {
            console.error('Error creating product:', error);
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    static async getProducts(req, res) {
        try {
            const product = await Product.findAll();
            return res.status(200).json({ success: true, data: product, message: product.length < 1 ? false : undefined })
        } catch (error) {
            console.error('Error creating product:', error);
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    static async deleteProduct(req, res) {
        try {
            await Product.deleteProductById(req.params.id_product);
            return res.status(200).json({ success: true, message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    static async editProduct(req, res) {
        try {
            const result = await Product.updateProductById(req.body, req.params.id_product);
            if (result[0] === 0) return res.status(404).json({ success: false, message: 'Product not found or no changes made' });
            return res.status(200).json({ success: true, data: result[0] })
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ success: false, error: error.message });
        }
    }
}