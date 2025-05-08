import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import dotenv from "dotenv";

const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Health check endpoint
app.get("/health", (req, res) => {
  // Don't rely on DB connection for this basic health check
  res
    .status(200)
    .json({ 
      status: "UP", 
      message: "Service is running properly",
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    });
});

// Routes
app.use("/api/auth", authRoutes);

// Root route for vercel
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ 
      status: "UP", 
      message: "Auth service is running properly",
      timestamp: new Date().toISOString()
    });
});

// Diagnostic route
app.get("/api/diagnostic", (req, res) => {
  // Don't expose full connection string but check if it exists
  const hasMongoDB = !!process.env.MONGODB_URI;
  const hasDBName = !!process.env.MONGODB_DB_NAME;
  const hasJWTSecret = !!process.env.JWT_SECRET;
  
  res.status(200).json({
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    config: {
      hasMongoDB,
      mongoDBFormat: hasMongoDB ? process.env.MONGODB_URI?.substring(0, 20) + '...' : 'missing',
      hasDBName,
      hasJWTSecret,
      port: process.env.PORT || '3001 (default)'
    }
  });
});

// 404 handler - should be before other error handlers
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Global error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal server error",
      error: {
        name: err.name,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      },
    });
  }
);

export default app;