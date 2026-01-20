import { User } from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/password";
import { generateOtp, otpExpiry } from "../utils/otp";
import { generateResetToken, resetExpiry } from "../utils/reset";
import { AppError } from "../utils/errors";
import { publishAuthEvent } from "../kafka/publishers/auth.publisher";
import * as jwt from "jsonwebtoken";
import { env } from "../config/env";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError("User already exists", 400);

  const hashedPassword = await hashPassword(password);
  const otp = generateOtp();

  await User.create({
    name,
    email,
    password: hashedPassword,
    otp,
    otpExpiresAt: otpExpiry(),
  });

  await publishAuthEvent("USER_OTP_CREATED", { email, otp });
};

export const verifyOtp = async (email: string, otp: string) => {
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


export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError("Invalid credentials", 401);

  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new AppError("Invalid credentials", 401);

  const token = jwt.sign(
    { sub: user._id.toString(), email: user.email },
    env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  await publishAuthEvent("USER_LOGGED_IN", {
    userId: user._id.toString(),
    email: user.email,
  });

  return { token, user };
};

export const resetPassword = async (token: string, newPassword: string) => {
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiresAt: { $gt: new Date() },
  });

  if (!user) throw new AppError("Invalid or expired token", 400);

  user.password = await hashPassword(newPassword);
  user.resetToken = undefined;
  user.resetTokenExpiresAt = undefined;

  await user.save();
};

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) return;

  const token = generateResetToken();
  user.resetToken = token;
  user.resetTokenExpiresAt = resetExpiry();
  await user.save();

  await publishAuthEvent("PASSWORD_RESET_REQUESTED", { email, token });
};
