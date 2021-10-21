import express from 'express';
import usersControllers from '../controllers/users.js';

export const usersRoutes = express.Router();

// GET /api/user
usersRoutes.get('/users', usersControllers.getUser)

// POST /api/user
usersRoutes.post('/users', usersControllers.createUser)
