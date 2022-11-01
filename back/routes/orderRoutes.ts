import express from 'express';
import { orderController } from '../controllers/orderController';
import { orderService } from '../services/orderServices';
import { userMiddleware } from '../util/middleware';

export const orderRoutes = express.Router();

orderRoutes.use(express.json());

const order = new orderService();
export const OrderController = new orderController(order);

// Get allorder (user)
orderRoutes.get('/order', userMiddleware, OrderController.getOrder)
orderRoutes.get('/orderLatest', userMiddleware, OrderController.getOrderLatest)
orderRoutes.patch('/payOrder/:id', OrderController.patchPayOrder)
// Get order (admin)
// orderRoutes.get('/orderAdmin', userMiddleware, OrderController.getOrderAdmin)
// Post order (user)
orderRoutes.post('/order', userMiddleware, OrderController.postOrder)
// Patch order (admin)