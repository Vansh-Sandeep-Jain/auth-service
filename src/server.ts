import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";
import { AddressInfo } from "net";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB().catch((err) => {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1);
});

// Start server on a dynamic port
const PORT = process.env.PORT || 3001;

// Create server with error handling
const server = app
  .listen(PORT, () => {
    const address = server.address() as AddressInfo;
    console.log(`✅ Authentication service running on port ${address.port}`);
  })
  .on("error", (error: NodeJS.ErrnoException) => {
    console.error("❌ Server error:", error);
    process.exit(1);
  });

// For Vercel serverless functions
export default app;