import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Log process environment for debugging in non-production environments
if (process.env.NODE_ENV !== 'production') {
  console.log('Environment variables loaded');
}

// Safely access environment variables with fallbacks
export const MONGODB_URI = process.env.MONGODB_URI || '';
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || '';
export const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_for_dev_only';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
export const PORT = process.env.PORT || 3001;

// Validate critical environment variables
if (!MONGODB_URI && process.env.NODE_ENV === 'production') {
  console.error('WARNING: MONGODB_URI environment variable is not set');
}

if (!MONGODB_DB_NAME && process.env.NODE_ENV === 'production') {
  console.error('WARNING: MONGODB_DB_NAME environment variable is not set');
}

if (JWT_SECRET === 'default_jwt_secret_for_dev_only' && process.env.NODE_ENV === 'production') {
  console.error('WARNING: Using default JWT_SECRET in production is not secure');
}