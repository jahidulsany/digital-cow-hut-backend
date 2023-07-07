import { z } from 'zod';

const createBuyerZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required!',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First Name is required!',
      }),
      lastName: z.string({
        required_error: 'Last Name is required!',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'Phone Number is required!',
    }),
    address: z.string({
      required_error: 'Address is required!',
    }),
    budget: z.number({
      required_error: 'Budget is required!',
    }),
    income: z.number({
      required_error: 'Income is required!',
    }),
  }),
});

export const BuyerValidation = {
  createBuyerZodSchema,
};
