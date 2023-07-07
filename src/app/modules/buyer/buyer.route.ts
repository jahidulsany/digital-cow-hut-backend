import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { BuyerController } from './buyer.controller';
import { BuyerValidation } from './buyer.validatation';

const router = express.Router();

router.post(
  '/create-buyer',
  validateRequest(BuyerValidation.createBuyerZodSchema),
  BuyerController.createBuyer
);

router.get('/:id', BuyerController.getSingleBuyer);

router.patch('/:id', BuyerController.updateBuyer);

router.delete('/:id', BuyerController.deleteBuyer);

router.get('/', BuyerController.getAllBuyers);

export const BuyerRoutes = router;
