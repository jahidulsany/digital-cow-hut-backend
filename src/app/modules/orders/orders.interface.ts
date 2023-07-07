import { Model, Types } from 'mongoose';
import { IBuyer } from '../buyer/buyer.interface';
import { ICow } from '../cow/cow.interface';

export type IOrders = {
  cow: Types.ObjectId | ICow;
  buyer: Types.ObjectId | IBuyer;
};

export type OrdersModel = Model<IOrders, Record<string, unknown>>;
