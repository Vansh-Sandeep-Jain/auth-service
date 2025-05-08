"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../config/constants");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res
                .status(401)
                .json({ message: "Authentication token missing or malformed" });
            return;
        }
        const token = authHeader.split(" ")[1];
        const decoded = yield jsonwebtoken_1.default.verify(token, constants_1.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Auth error:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
});
exports.authenticate = authenticate;
const authorize = (...allowedRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                message: "Forbidden: You do not have access to this resource",
            });
            return;
        }
        next();
    }
    catch (error) {
        console.error("Authorization error:", error);
        res.status(500).json({ message: "Authorization error" });
    }
});
exports.authorize = authorize;
