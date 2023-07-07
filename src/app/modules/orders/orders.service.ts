import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/Pagination';
import { IBuyer } from '../buyer/buyer.interface';
import { Buyer } from '../buyer/buyer.model';
import { ICow } from '../cow/cow.interface';
import { Cow } from '../cow/cow.model';
import { Seller } from '../seller/seller.model';
import { IOrders } from './orders.interface';
import { Order } from './orders.model';

const createOrders = async (cow: ICow, buyer: IBuyer) => {
  const session = await mongoose.startSession();
  try {
    // Change the cow's label to 'sold out'
    await Cow.findByIdAndUpdate(cow, { label: 'sold out' });

    // Deduct the cost of the cow from the buyer's budget
    await Buyer.findByIdAndUpdate(buyer, {});

    // Increase the seller's income by the same amount
    await Cow.findById(cow);
    await Seller.findByIdAndUpdate(cow.seller, {});

    session.startTransaction();

    // Create student using sesssin
    const newCow = await Cow.create([cow], { session });

    if (!newCow.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create cow');
    }

    const newBuyer = await Buyer.create([buyer], { session });

    if (!newBuyer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create buyer');
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getAllOrders = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IOrders[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePaginations(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Order.find()
    .populate('cow buyer')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const OrdersService = {
  createOrders,
  getAllOrders,
};
