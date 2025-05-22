import User from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/hash.utils";
import jwt from "jsonwebtoken";
import { IUser } from "../types/user.types";
import { JWT_SECRET } from "../config/constants";
import CoachList from "../models/coachList.model";
import { Conflict, NotFound, Unauthorized } from "../utils/appError";
import ProfileImage from "../models/profileImage.model";

export const registerUser = async (data: IUser) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) {
    throw Conflict("Email already in use");
  }

  const isCoach = await CoachList.findOne({ email: data.email });

  const hashed = await hashPassword(data.password);
  const user = new User({
    ...data,
    password: hashed,
    role: isCoach ? "coach" : "client",
  });
  await user.save();

  const { password: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound("User not found");
  }

  if (!(await comparePassword(password, user.password))) {
    throw Unauthorized("Invalid credentials");
  }

  const token = jwt.sign(
    {
      sub: user._id,
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      preferableActivity: user.preferableActivity,
      target: user.target
    },
    JWT_SECRET!,
    {
      expiresIn: "1d",
    }
  );

  // Fetch profile image
  let imageUrl = null;
  try {
    const profileImage = await ProfileImage.findOne({ userId: user._id }).lean();
    if (profileImage && profileImage.base64encodedImage) {
      imageUrl = profileImage.base64encodedImage;
    }
  } catch (error) {
    console.error("Error fetching profile image:", error);
  }

  return { 
    token, 
    imageUrl 
  };
};
