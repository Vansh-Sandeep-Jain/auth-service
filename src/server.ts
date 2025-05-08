import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";
import { AddressInfo } from "net";

// Load environment variables
dotenv.config();
console.log("hello", process.env.MONGODB_URI);

// Connect to MongoDB
connectDB().catch((err) => {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1);
});

// Start server on a dynamic port
const PORT = process.env.PORT || 5000;

// Create server with error handling
const server = app
  .listen(PORT, () => {
    const address = server.address() as AddressInfo;
    console.log(`✅ Authentication service running on port ${address.port}`);
  })
  .on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
      console.log(
        `⚠️ Port ${PORT} is already in use. Trying ${Number(PORT) + 1}...`
      );
      // Try the next port
      const newPort = Number(PORT) + 1;
      server.listen(newPort, () => {
        const address = server.address() as AddressInfo;
        console.log(
          `✅ Authentication service running on port ${address.port}`
        );
      });
    } else {
      console.error("❌ Server error:", error);
      process.exit(1);
    }
  });
