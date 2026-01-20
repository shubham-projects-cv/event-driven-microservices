import { FastifyInstance } from "fastify";
import { forgotPasswordCtrl, register, resetPasswordCtrl } from "../controllers/auth.controller";
import { verifyOtpCtrl, loginCtrl } from "../controllers/auth.controller";

export const authRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post("/register", register);
  app.post("/verify-otp", verifyOtpCtrl);
  app.post("/login", loginCtrl);
  app.post("/forgot-password", forgotPasswordCtrl);
  app.post("/reset-password", resetPasswordCtrl);
};
