"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const app_1 = __importDefault(require("./app"));
// Load environment variables
dotenv_1.default.config();
console.log("hello", process.env.MONGODB_URI);
// Connect to MongoDB
(0, db_1.default)().catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
});
// Start server on a dynamic port
const PORT = process.env.PORT || 5000;
// Create server with error handling
const server = app_1.default
    .listen(PORT, () => {
    const address = server.address();
    console.log(`✅ Authentication service running on port ${address.port}`);
})
    .on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.log(`⚠️ Port ${PORT} is already in use. Trying ${Number(PORT) + 1}...`);
        // Try the next port
        const newPort = Number(PORT) + 1;
        server.listen(newPort, () => {
            const address = server.address();
            console.log(`✅ Authentication service running on port ${address.port}`);
        });
    }
    else {
        console.error("❌ Server error:", error);
        process.exit(1);
    }
});
