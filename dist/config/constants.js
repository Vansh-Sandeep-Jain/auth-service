"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.JWT_EXPIRATION = exports.JWT_SECRET = exports.MONGODB_DB_NAME = exports.MONGODB_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
exports.MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'mydatabase';
exports.JWT_SECRET = process.env.JWT_SECRET || 'epam';
exports.JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
exports.PORT = process.env.PORT || 3001;
