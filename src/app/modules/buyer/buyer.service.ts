import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/Pagination';
import { IBuyer } from './buyer.interface';
import { Buyer } from './buyer.model';

const createBuyer = async (buyer: IBuyer): Promise<IBuyer | null> => {
  const createdBuyer = await Buyer.create(buyer);
  if (!createBuyer) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Buyer');
  }
  return createdBuyer;
};

const getAllBuyers = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBuyer[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePaginations(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Buyer.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Buyer.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBuyer = async (id: string): Promise<IBuyer | null> => {
  const result = await Buyer.findById(id);
  return result;
};

const updateBuyer = async (
  id: string,
  payload: Partial<IBuyer>
): Promise<IBuyer | null> => {
  const result = await Buyer.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBuyer = async (id: string): Promise<IBuyer | null> => {
  const result = await Buyer.findByIdAndDelete(id);
  return result;
};

export const BuyerService = {
  createBuyer,
  getAllBuyers,
  getSingleBuyer,
  updateBuyer,
  deleteBuyer,
};
