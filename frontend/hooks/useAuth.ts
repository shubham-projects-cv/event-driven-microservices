import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  loginUser,
  registerUser,
  verifyOtp,
  forgotPassword,
  resetPassword,
  LoginResponse,
} from "@/services/auth.api";

interface ApiError {
  message: string;
}

export const useLogin = () =>
  useMutation<
    LoginResponse,
    AxiosError<ApiError>,
    { email: string; password: string }
  >({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Login successful");
    },
    onError: (error) => {
      toast.error(error.response?.data.message ?? "Login failed");
    },
  });

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
      toast.error(error.response?.data.message ?? "Invalid OTP");
    },
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: ({ email }: { email: string }) => forgotPassword(email),
    onSuccess: () => toast.success("Reset link sent"),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      resetPassword(token, password),
    onSuccess: () => toast.success("Password reset successful"),
  });
