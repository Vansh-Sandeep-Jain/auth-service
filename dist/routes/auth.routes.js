"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const auth_validators_1 = require("../validators/auth.validators");
const router = express_1.default.Router();
router.post("/sign-up", (0, validation_middleware_1.validate)(auth_validators_1.registerSchema), auth_controller_1.signup);
router.post("/sign-in", (0, validation_middleware_1.validate)(auth_validators_1.loginSchema), auth_controller_1.login);
exports.default = router;
