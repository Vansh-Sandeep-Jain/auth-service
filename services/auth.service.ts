import User from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/hash.utils";
import jwt from "jsonwebtoken";
import { IUser } from "../types/user.types";
import { JWT_SECRET } from "../config/constants";
import CoachList from "../models/coachList.model";

export const registerUser = async (data: IUser) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("Email already in use");

  const isCoach = await CoachList.findOne({ email: data.email });

  const hashed = await hashPassword(data.password);
  const user = new User({
    ...data,
    password: hashed,
    role: isCoach ? "coach" : "client",
  });
  await user.save();
  return { message: "User registered" };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User Not Found");
  }

  if (!await comparePassword(password, user.password)) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET!, {
    expiresIn: "1d",
  });

  const { password: _, ...userWithoutPassword } = user.toObject(); // Exclude password from the user object

  return { token, user: userWithoutPassword };
};
