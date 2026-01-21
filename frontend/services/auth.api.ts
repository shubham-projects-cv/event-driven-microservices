import { api } from "@/lib/axios";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = (data: RegisterPayload) =>
  api.post("/auth/register", data);

export const verifyOtp = (data: VerifyOtpPayload) =>
  api.post("/auth/verify-otp", data);

export const loginUser = (data: LoginPayload) => api.post("/auth/login", data);

export const forgotPassword = (email: string) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (token: string, password: string) =>
  api.post("/auth/reset-password", { token, password });
