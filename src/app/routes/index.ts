import express from 'express';
import { BuyerRoutes } from '../modules/buyer/buyer.route';
import { CowRoutes } from '../modules/cow/cow.route';
import { OrdersRoutes } from '../modules/orders/orders.route';
import { SellerRoutes } from '../modules/seller/seller.route';
import { UserRoutes } from '../modules/user/user.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users/',
    route: UserRoutes,
  },
  {
    path: '/cows/',
    route: CowRoutes,
  },
  {
    path: '/sellers/',
    route: SellerRoutes,
  },
  {
    path: '/buyers/',
    route: BuyerRoutes,
  },
  {
    path: '/orders/',
    route: OrdersRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
