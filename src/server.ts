import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB().catch((err) => {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`auth-service is running on port ${PORT}`);
});
