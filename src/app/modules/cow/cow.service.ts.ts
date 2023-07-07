import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/Pagination';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (cow: ICow): Promise<ICow | null> => {
  const createdCow = (await Cow.create(cow)).populate('seller');
  if (!createCow) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create cow');
  }
  return createdCow;
};

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const cowSearchableFields = ['location', 'breed', 'category'];
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePaginations(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('seller');
  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('seller');
  return result;
};

const deleteUser = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id);
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteUser,
};
