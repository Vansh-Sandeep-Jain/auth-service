import express from "express";
import { signup, login } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validators";

const router = express.Router();

router.post("/sign-up", validate(registerSchema), signup);
router.post("/sign-in", validate(loginSchema), login);

export default router;
