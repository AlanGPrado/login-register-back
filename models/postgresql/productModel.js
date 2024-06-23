import { db } from './db.js';

export class ProductModel {
    static async postProduct(req, res) {
        let { nombre, descripcion, categoria, sku, costo, precio, imagen } = req.body;
        console.log(req.body);
        try {
            const result = await db`INSERT INTO products (name_product, desc_product, category_id, sku, cost, price, image) 
            VALUES (${nombre}, ${descripcion}, ${categoria}, ${sku}, ${costo}, ${precio}, ${imagen}) RETURNING *`;
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            console.log('Error executing query:', error);
            throw error;
        }
    }

    static async getProducts(req, res) {
        try {
            const result = await db`SELECT * FROM products;`;
            return res.status(200).json({ success: true, data: result, message: result.length < 1 ? false : undefined });
        } catch (error) {
            console.log('Error executing query:', error);
            throw error;
        }
    }

    static async deleteProduct(req, res) {
        let { id_product } = req.params;
        try {
            const result = await db`DELETE FROM products WHERE id_product = ${id_product}`;
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            console.log('Error executing query:', error);
            return res.status(500).json({ success: false, message: 'An error ocurred while processing your request' });
        }
    }

    static async editProduct(req, res) {
        let { nombre, descripcion, categoria, sku, costo, precio, imagen } = req.body;
        let { id_product } = req.params;
        try {
            console.log(req.params, "PARAMS");
            console.log(req.body, "BODY");
            const result = await db`UPDATE products SET name_product = ${nombre}, desc_product = ${descripcion}, category_id = ${categoria}, sku = ${sku}, cost = ${costo}, price = ${precio}, image = ${imagen} WHERE id_product = ${id_product}`;
            return res.status(200).json({ success: true, data: result });

        } catch (error) {
            console.log('Error executing query:', error);
            throw error;
        }
    }
}