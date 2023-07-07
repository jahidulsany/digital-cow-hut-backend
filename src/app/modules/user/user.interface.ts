import { Model, Types } from 'mongoose';
import { IBuyer } from '../buyer/buyer.interface';
import { ISeller } from '../seller/seller.interface';

export type IUser = {
  phoneNumber: string;
  role: 'seller' | 'buyer';
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: 0;
  buyer?: Types.ObjectId | IBuyer;
  seller?: Types.ObjectId | ISeller;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
