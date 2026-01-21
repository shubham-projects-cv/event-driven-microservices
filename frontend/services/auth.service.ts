import authApi from "@/lib/axios-auth";

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await authApi.post("/auth/register", payload);
  return res.data;
};

export const verifyOtp = async (payload: { email: string; otp: string }) => {
  const res = await authApi.post("/auth/verify-otp", payload);
  return res.data;
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await authApi.post("/auth/login", payload);
  return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await authApi.post("/auth/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (token: string, password: string) => {
  const res = await authApi.post("/auth/reset-password", {
    token,
    password,
  });
  return res.data;
};
