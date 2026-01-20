import { User } from "../models/user.model";
import { hashPassword } from "../utils/password";
import { generateOtp } from "../utils/otp";
import { producer } from "../kafka/producer";
import { AppError } from "../utils/errors";
import * as jwt from "jsonwebtoken";
import { comparePassword } from "../utils/password";
import { env } from "../config/env";
import { otpExpiry } from "../utils/otp";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
): Promise<void> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await hashPassword(password);
  const otp = generateOtp();

  await User.create({
    name,
    email,
    password: hashedPassword,
    otp,
    otpExpiresAt: otpExpiry(),
  });

  await producer.send({
    topic: "USER_OTP_CREATED",
    messages: [
      {
        value: JSON.stringify({ email, otp }),
      },
    ],
  });
};

export const verifyOtp = async (email: string, otp: string): Promise<void> => {
  const user = await User.findOne({ email });
  if (!user || !user.otp || !user.otpExpiresAt) {
    throw new AppError("Invalid OTP", 400);
  }

  if (user.otp !== otp || user.otpExpiresAt < new Date()) {
    throw new AppError("OTP expired or invalid", 400);
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiresAt = undefined;
  await user.save();
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<string> => {
  const user = await User.findOne({ email });
  if (!user || !user.isVerified) {
    throw new AppError("Unauthorized", 401);
  }

  const ok = await comparePassword(password, user.password);
  if (!ok) {
    throw new AppError("Invalid credentials", 401);
  }

  return jwt.sign({ sub: user.id, email: user.email }, env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
