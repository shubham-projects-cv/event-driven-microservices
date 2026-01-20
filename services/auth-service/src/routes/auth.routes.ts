import { FastifyInstance } from "fastify";
import {
  register,
  verifyOtpCtrl,
  login,
  forgotPasswordCtrl,
  resetPasswordCtrl,
} from "../controllers/auth.controller";

export const authRoutes = async (app: FastifyInstance) => {
  app.post("/register", register);
  app.post("/verify-otp", verifyOtpCtrl);
  app.post("/login", login);
  app.post("/forgot-password", forgotPasswordCtrl);
  app.post("/reset-password", resetPasswordCtrl);
};
