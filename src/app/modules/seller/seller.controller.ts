import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ISeller } from './seller.interface';
import { SellerService } from './seller.service';

const createSeller = catchAsync(async (req: Request, res: Response) => {
  const { ...seller } = req.body;
  const result = await SellerService.createSeller(seller);

  sendResponse<ISeller>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Seller created successfully',
    data: result,
  });
});

const getAllSellers = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await SellerService.getAllSellers(paginationOptions);

  sendResponse<ISeller[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Sellers retrieved successfully!!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SellerService.getSingleSeller(id);

  sendResponse<ISeller>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Seller retrieved successfully!!',
    data: result,
  });
});

const updateSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await SellerService.updateSeller(id, payload);

  sendResponse<ISeller>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Seller updated successfully!!',
    data: result,
  });
});

const deleteSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SellerService.deleteSeller(id);

  sendResponse<ISeller>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Seller deleted successfully!!',
    data: result,
  });
});

export const SellerController = {
  createSeller,
  getAllSellers,
  getSingleSeller,
  updateSeller,
  deleteSeller,
};
