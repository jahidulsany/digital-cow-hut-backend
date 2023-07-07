import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import Routes from './app/routes/index';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/v1/', Routes);

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // throw new ApiError('Ore baba Error');
//   // next('Ore baba error')
//   // Promise.reject(new Error('Unhandled Exception!!'));
//   // console.log(x);
// });

// Global Error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
