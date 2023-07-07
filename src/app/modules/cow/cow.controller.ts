import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { filterableFields } from '../../../constants/filters';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ICow } from './cow.interface';
import { CowService } from './cow.service.ts';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body;
  const result = await CowService.createCow(cowData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow created successfully',
    data: result,
  });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await CowService.getAllCows(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow retrieved successfully!!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.getSingleCow(id);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow retrieved successfully!!',
    data: result,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await CowService.updateCow(id, payload);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow retrieved successfully!!',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.deleteUser(id);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully!!',
    data: result,
  });
});

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteUser,
};
