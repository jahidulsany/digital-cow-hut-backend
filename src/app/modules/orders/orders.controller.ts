import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IOrders } from './orders.interface';
import { OrdersService } from './orders.service';

const createOrders = catchAsync(async (req: Request, res: Response) => {
  const { cow, buyer } = req.body;
  const result = await OrdersService.createOrders(cow, buyer);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders created successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await OrdersService.getAllOrders(paginationOptions);

  sendResponse<IOrders[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully!!',
    meta: result.meta,
    data: result.data,
  });
});

export const OrdersController = {
  createOrders,
  getAllOrders,
};
