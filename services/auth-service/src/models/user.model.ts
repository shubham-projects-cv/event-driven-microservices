import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  otp?: string;
  otpExpiresAt?: Date;
  resetToken?: string;
  resetTokenExpiresAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiresAt: { type: Date },
    resetToken: { type: String },
    resetTokenExpiresAt: { type: Date },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", UserSchema);
