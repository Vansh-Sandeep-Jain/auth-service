import mongoose from "mongoose";
import { MONGODB_DB_NAME, MONGODB_URI } from "./constants";

let isConnected = false;

const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log("🔁 Using existing MongoDB connection");
    return;
  }

  try {
    // Check for valid MongoDB URI
    if (!MONGODB_URI) {
      console.error("❌ MongoDB URI is not defined in environment variables");
      // Don't exit the process in serverless environment
      return;
    }

    // Check for valid DB name
    if (!MONGODB_DB_NAME) {
      console.error("❌ MongoDB database name is not defined in environment variables");
      // Don't exit the process in serverless environment
      return;
    }

    console.log(`🔄 Connecting to MongoDB with database: ${MONGODB_DB_NAME}`);
    
    const conn = await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB_NAME,
      // Add connection options for better reliability on serverless
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    // Don't exit the process in serverless environment
    // process.exit(1);
  }
};

export default connectDB;