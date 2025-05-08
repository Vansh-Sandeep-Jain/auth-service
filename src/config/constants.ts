import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'mydatabase';
export const JWT_SECRET = process.env.JWT_SECRET || 'epam';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
export const PORT = process.env.PORT || 3001;