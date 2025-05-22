import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import dotenv from "dotenv";
import sendResponse from "./utils/sendResponse";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json(
    sendResponse({
      success: true,
      message: "Service is running properly",
      data: { status: "UP" }
    })
  );
});

// Routes
app.use("/", authRoutes);

// 404 handler - should be before other error handlers
app.use("*", (req, res) => {
  res.status(404).json(
    sendResponse({
      success: false,
      message: `Route not found: ${req.originalUrl}`,
      error: "Not Found"
    })
  );
});

// Global error handler
app.use(errorHandler);

export default app;