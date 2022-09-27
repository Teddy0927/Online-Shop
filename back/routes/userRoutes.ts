import express from 'express';
import { userController } from '../controllers/userController';
import { userService } from '../services/userServices';

export const userRoutes = express.Router();

userRoutes.use(express.json());

const user = new userService();
export const UserController = new userController(user);
// CRUD

// Login
userRoutes.post('/login', UserController.login);
// Register account
userRoutes.post('/register', UserController.register);
// Update item

// Delete item