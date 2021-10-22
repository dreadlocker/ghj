import express from 'express';
import categoriesControllers from '../controllers/categories.js';

export const categoriesRoutes = express.Router();

// GET /api/categories
categoriesRoutes.get('/categories', categoriesControllers.getCategories)

// POST /api/categories
categoriesRoutes.post('/categories', categoriesControllers.createCategory)

// DELETE /api/categories
categoriesRoutes.delete('/categories', categoriesControllers.deleteAllCategories)
