import express from 'express';
import productControllers from '../controllers/products.js';

export const productsRoutes = express.Router();

// GET /api/products
productsRoutes.get('/products', productControllers.getProducts)

// POST /api/products
productsRoutes.post('/products', productControllers.createProduct)

// DELETE /api/products/:productId
productsRoutes.delete('/products/:productId', productControllers.deleteProduct)

// PUT /api/products
productsRoutes.put('/products/:productId', productControllers.updateProduct)
