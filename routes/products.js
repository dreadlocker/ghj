import express from 'express';
import productControllers from '../controllers/products.js';

export const productsRoutes = express.Router();

// GET /products
productsRoutes.get('/products', productControllers.getProducts)

// POST /products
productsRoutes.post('/products', productControllers.createProduct)

// DELETE /products/:productId
productsRoutes.delete('/products/:productId', productControllers.deleteProduct)

// PUT /products
productsRoutes.put('/products/:productId', productControllers.updateProduct)
