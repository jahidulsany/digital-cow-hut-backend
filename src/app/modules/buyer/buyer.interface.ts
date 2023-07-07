import { Model } from 'mongoose';

export type IBuyer = {
  password: string;
  role: 'buyer';
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
  budget: number;
  income: 0;
};

export type BuyerModel = Model<IBuyer, Record<string, unknown>>;
