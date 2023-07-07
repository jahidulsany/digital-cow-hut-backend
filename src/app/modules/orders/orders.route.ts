import express from 'express';
import { OrdersController } from './orders.controller';
const router = express.Router();

router.post('/create-orders', OrdersController.createOrders);

router.get('/', OrdersController.getAllOrders);

export const OrdersRoutes = router;
