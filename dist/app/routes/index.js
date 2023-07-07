"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const buyer_route_1 = require("../modules/buyer/buyer.route");
const cow_route_1 = require("../modules/cow/cow.route");
const orders_route_1 = require("../modules/orders/orders.route");
const seller_route_1 = require("../modules/seller/seller.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users/',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/cows/',
        route: cow_route_1.CowRoutes,
    },
    {
        path: '/sellers/',
        route: seller_route_1.SellerRoutes,
    },
    {
        path: '/buyers/',
        route: buyer_route_1.BuyerRoutes,
    },
    {
        path: '/orders/',
        route: orders_route_1.OrdersRoutes,
    },
];
moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
