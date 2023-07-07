import { z } from 'zod';
import { cowBreeds, cowCategories, cowLabels } from './cow.constants';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required!',
    }),
    age: z.number({
      required_error: 'Age is required!',
    }),
    price: z.number({
      required_error: 'Price is required!',
    }),
    location: z.string({
      required_error: 'Location is required!',
    }),
    breed: z.enum([...cowBreeds] as [string, ...string[]], {
      required_error: 'Breed is required!',
    }),
    weight: z.number({
      required_error: 'Age is required!',
    }),
    label: z.enum([...cowLabels] as [string, ...string[]], {
      required_error: 'Label is required!',
    }),
    category: z.enum([...cowCategories] as [string, ...string[]], {
      required_error: 'Category is required!',
    }),
    seller: z.string({
      required_error: 'Seller is required!',
    }),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.string().optional(),
    breed: z.enum([...cowBreeds] as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    label: z.enum([...cowLabels] as [string, ...string[]]).optional(),
    category: z.enum([...cowCategories] as [string, ...string[]]).optional(),
    seller: z.string().optional(),
  }),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
