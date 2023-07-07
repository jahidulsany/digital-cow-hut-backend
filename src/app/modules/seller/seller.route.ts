import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { SellerController } from './seller.controller';
import { SellerValidation } from './seller.validatation';

const router = express.Router();

router.post(
  '/create-seller',
  validateRequest(SellerValidation.createSellerZodSchema),
  SellerController.createSeller
);

router.get('/:id', SellerController.getSingleSeller);

router.patch('/:id', SellerController.updateSeller);

router.delete('/:id', SellerController.deleteSeller);

router.get('/', SellerController.getAllSellers);

export const SellerRoutes = router;
