import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validatation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get('/:id', UserController.getSingleUser);

router.patch('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUser);

router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
