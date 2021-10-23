import express from 'express';
import categoriesControllers from '../controllers/categories.js';

export const categoriesRoutes = express.Router();

// GET /categories
categoriesRoutes.get('/categories', categoriesControllers.getCategories)

// POST /categories
categoriesRoutes.post('/categories', categoriesControllers.createCategory)

// DELETE /categories
categoriesRoutes.delete('/categories', categoriesControllers.deleteAllCategories)
