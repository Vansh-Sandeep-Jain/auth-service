import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};
