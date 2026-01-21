import { api } from "@/lib/axios";

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post("/auth/register", payload);
};

export const verifyOtp = async (payload: { email: string; otp: string }) => {
  return api.post("/auth/verify-otp", payload);
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  return api.post("/auth/login", payload);
};

export const forgotPassword = async (email: string) => {
  return api.post("/auth/forgot-password", { email });
};

export const resetPassword = async (token: string, password: string) => {
  return api.post("/auth/reset-password", { token, password });
};
