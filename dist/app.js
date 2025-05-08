"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
// Load environment variables
dotenv_1.default.config();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
// Health check endpoint
app.get("/health", (req, res) => {
    res
        .status(200)
        .json({ status: "UP", message: "Service is running properly" });
});
console.log("app.ts", process.env.MONGODB_URI);
// Routes
app.use("/", auth_routes_1.default);
// 404 handler - should be before other error handlers
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`,
    });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error("Error:", err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal server error",
        error: Object.assign({ name: err.name }, (process.env.NODE_ENV === "development" && { stack: err.stack })),
    });
});
exports.default = app;
