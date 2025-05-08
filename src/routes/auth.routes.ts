import express from "express";
import { signup, login } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validators";

const router = express.Router();

// Health check for auth routes
router.get("/health", (req, res) => {
  res.status(200).json({ message: "Auth routes are working" });
});

router.post("/sign-up", validate(registerSchema), signup);
router.post("/sign-in", validate(loginSchema), login);

export default router;