import { Model } from 'mongoose';

export type ISeller = {
  password: string;
  role: 'seller';
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
  budget: 0;
  income: 0;
};

export type SellerModel = Model<ISeller, Record<string, unknown>>;
