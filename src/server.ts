import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";
import { AddressInfo } from "net";

// Load environment variables
dotenv.config();

// Determine if we're running in serverless environment
const isServerless = process.env.VERCEL || process.env.LAMBDA || process.env.AWS_LAMBDA;

// Try to connect to MongoDB - don't crash app if connection fails in serverless
try {
  connectDB().catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    // Don't exit in serverless environment
    if (!isServerless) {
      process.exit(1);
    }
  });
} catch (err) {
  console.error("Error during MongoDB connection setup:", err);
  // Continue execution in serverless
}

// Only start an HTTP server if not in serverless environment
if (!isServerless) {
  const PORT = process.env.PORT || 3001;
  const server = app
    .listen(PORT, () => {
      const address = server.address() as AddressInfo;
      console.log(`✅ Authentication service running on port ${address.port}`);
    })
    .on("error", (error: NodeJS.ErrnoException) => {
      console.error("❌ Server error:", error);
      process.exit(1);
    });
} else {
  console.log("🚀 Running in serverless mode");
}

// For Vercel serverless functions
export default app;