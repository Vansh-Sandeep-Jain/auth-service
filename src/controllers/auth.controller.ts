// auth.controller.ts
import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import sendResponse from "../utils/sendResponse";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await registerUser(req.body);
    return res.status(201).json(
      sendResponse({
        success: true,
        message: "User registered successfully",
        data: result
      })
    );
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    
    return res.status(200).json(
      sendResponse({
        success: true,
        message: "Login successful",
        data
      })
    );
  } catch (err) {
    next(err);
  }
};