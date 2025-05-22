import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An error occurred',
    error: process.env.NODE_ENV === 'production' ? "Something went wrong" : err.stack
  });
};