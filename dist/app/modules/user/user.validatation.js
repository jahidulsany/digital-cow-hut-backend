"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'Phone Number is required!',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required!',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First Name is required!',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last Name is required!',
            }),
        }),
        address: zod_1.z.string({
            required_error: 'Address is required!',
        }),
        budget: zod_1.z.number({
            required_error: 'Budget is required!',
        }),
        income: zod_1.z.number({
            required_error: 'Income is required!',
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
