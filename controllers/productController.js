import { ProductModel } from "../models/postgresql/productModel.js";

export class ProductController {
    static async postProduct(req, res) {
        await ProductModel.postProduct(req, res);
    }

    static async getProducts(req, res) {
        await ProductModel.getProducts(req, res);
    }

    static async deleteProduct(req, res) {
        await ProductModel.deleteProduct(req, res);
    }

    static async editProduct(req, res) {
        await ProductModel.editProduct(req, res);
    }
}