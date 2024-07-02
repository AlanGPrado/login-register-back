import { Router } from 'express';
import { ProductController } from '../controllers/productController.js';
export const productRouter = Router();

productRouter.post('/add/product', ProductController.postProduct);
productRouter.get('/get/product', ProductController.getProducts);
productRouter.delete('/delete/product/:id_product', ProductController.deleteProduct);
productRouter.patch('/edit/product/:id_product', ProductController.editProduct);