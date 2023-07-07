import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  // console.log(error);
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
