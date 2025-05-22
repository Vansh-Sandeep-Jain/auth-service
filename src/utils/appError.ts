export class AppError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Common error creators
export const BadRequest = (message: string) => new AppError(message, 400);
export const Unauthorized = (message: string) => new AppError(message, 401);
export const NotFound = (message: string) => new AppError(message, 404);
export const Conflict = (message: string) => new AppError(message, 409);