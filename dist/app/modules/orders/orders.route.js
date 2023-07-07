"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("./orders.controller");
const router = express_1.default.Router();
router.post('/create-orders', orders_controller_1.OrdersController.createOrders);
router.get('/', orders_controller_1.OrdersController.getAllOrders);
exports.OrdersRoutes = router;
