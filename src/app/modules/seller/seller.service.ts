import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/Pagination';
import { ISeller } from './seller.interface';
import { Seller } from './seller.model';

const createSeller = async (seller: ISeller): Promise<ISeller | null> => {
  const createdSeller = await Seller.create(seller);
  if (!createSeller) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create seller');
  }
  return createdSeller;
};

const getAllSellers = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISeller[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePaginations(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Seller.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Seller.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSeller = async (id: string): Promise<ISeller | null> => {
  const result = await Seller.findById(id);
  return result;
};

const updateSeller = async (
  id: string,
  payload: Partial<ISeller>
): Promise<ISeller | null> => {
  const result = await Seller.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSeller = async (id: string): Promise<ISeller | null> => {
  const result = await Seller.findByIdAndDelete(id);
  return result;
};

export const SellerService = {
  createSeller,
  getAllSellers,
  getSingleSeller,
  updateSeller,
  deleteSeller,
};
