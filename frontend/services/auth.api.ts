import api from "@/lib/axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  return res.data;
};

export const registerUser = async (payload: RegisterPayload): Promise<void> => {
  await api.post("/auth/register", payload);
};

export const verifyOtp = async (payload: VerifyOtpPayload): Promise<void> => {
  await api.post("/auth/verify-otp", payload);
};

export const forgotPassword = async (email: string): Promise<void> => {
  await api.post("/auth/forgot-password", { email });
};

export const resetPassword = async (
  token: string,
  password: string,
): Promise<void> => {
  await api.post("/auth/reset-password", { token, password });
};
