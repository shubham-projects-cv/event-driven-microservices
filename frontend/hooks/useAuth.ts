import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import {
  registerUser,
  verifyOtp,
  loginUser,
  forgotPassword,
  resetPassword,
} from "@/services/auth.service";

interface ApiError {
  message: string;
}

export const useRegister = () =>
  useMutation({
    mutationFn: registerUser,
    onSuccess: () => toast.success("OTP sent to email"),
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data.message ?? "Registration failed");
    },
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => toast.success("Account verified"),
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data.message ?? "Invalid or expired OTP");
    },
  });

export const useLogin = () =>
  useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data.message ?? "Login failed");
    },
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: ({ email }: { email: string }) => forgotPassword(email),
    onSuccess: () => toast.success("Reset link sent to email"),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      resetPassword(token, password),
    onSuccess: () => toast.success("Password reset successful"),
  });
