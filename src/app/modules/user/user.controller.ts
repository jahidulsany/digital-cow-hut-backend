import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;
  const result = await UserService.createUser(user);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UserService.getAllUsers(paginationOptions);

  sendResponse<IUser[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully!!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully!!',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await UserService.updateUser(id, payload);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully!!',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully!!',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
