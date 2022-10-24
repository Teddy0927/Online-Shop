import express from 'express';
import { cartController } from '../controllers/cartController';
import { cartService } from '../services/cartServices';
import { userMiddleware } from '../util/middleware';

export const cartRoutes = express.Router();

cartRoutes.use(express.json());

const cart = new cartService();
export const CartController = new cartController(cart);

// Get cart item
cartRoutes.get('/cart', userMiddleware, CartController.getCart);
cartRoutes.post('/cart', userMiddleware, CartController.postCart);
cartRoutes.delete('/cart', userMiddleware, CartController.deleteCart);
// CRUD

// Get all item

// Get item by id

// Create item

// Update item

// Delete item