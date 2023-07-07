import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IBuyer } from './buyer.interface';
import { BuyerService } from './buyer.service';

const createBuyer = catchAsync(async (req: Request, res: Response) => {
  const { ...buyer } = req.body;
  const result = await BuyerService.createBuyer(buyer);

  sendResponse<IBuyer>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Buyer created successfully',
    data: result,
  });
});

const getAllBuyers = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BuyerService.getAllBuyers(paginationOptions);

  sendResponse<IBuyer[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Buyers retrieved successfully!!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBuyer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BuyerService.getSingleBuyer(id);

  sendResponse<IBuyer>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Buyer retrieved successfully!!',
    data: result,
  });
});

const updateBuyer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await BuyerService.updateBuyer(id, payload);

  sendResponse<IBuyer>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Buyer updated successfully!!',
    data: result,
  });
});

const deleteBuyer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BuyerService.deleteBuyer(id);

  sendResponse<IBuyer>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Buyer deleted successfully!!',
    data: result,
  });
});

export const BuyerController = {
  createBuyer,
  getAllBuyers,
  getSingleBuyer,
  updateBuyer,
  deleteBuyer,
};
