import { model, Schema } from 'mongoose';
import { cowBreeds, cowCategories, cowLabels } from './cow.constants';
import { CowModel, ICow } from './cow.interface';

const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      enum: cowBreeds,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      enum: cowLabels,
      required: true,
    },
    category: {
      type: String,
      enum: cowCategories,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cow = model<ICow, CowModel>('Cow', cowSchema);
