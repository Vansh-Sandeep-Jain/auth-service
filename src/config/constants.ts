import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = "mongodb+srv://suhaibepam:xQFQUtLkZd20JF4t@cluster0.yws0spk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/"
export const MONGODB_DB_NAME = "USERDB"
export const JWT_SECRET = 'epam';
export const JWT_EXPIRATION = '1h';
export const PORT = process.env.PORT || 3001;