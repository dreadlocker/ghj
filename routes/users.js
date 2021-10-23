import express from 'express';
import usersControllers from '../controllers/users.js';

export const usersRoutes = express.Router();

// GET /user
usersRoutes.get('/users', usersControllers.getUser)

// POST /user
usersRoutes.post('/users', usersControllers.createUser)
