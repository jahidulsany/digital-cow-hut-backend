import { Model, Types } from 'mongoose';
import { ISeller } from '../seller/seller.interface';

export type ICowBreeds =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';

export type ICowCategories = 'Dairy' | 'Beef' | 'Dual Purpose';

export type ICowLabels = 'for sale' | 'sold out';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: string;
  breed: ICowBreeds;
  weight: number;
  label: ICowLabels;
  category: ICowCategories;
  seller: Types.ObjectId | ISeller;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
  price?: number;
  location?: string;
};
