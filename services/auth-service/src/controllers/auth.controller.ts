import { FastifyReply, FastifyRequest } from "fastify";
import {
  registerUser,
  verifyOtp,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../services/auth.service";

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const { name, email, password } = req.body as any;

  await registerUser(name, email, password);

  reply.code(201).send({ message: "OTP sent to email" });
};

export const verifyOtpCtrl = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { email, otp } = req.body as any;

  await verifyOtp(email, otp);

  reply.send({ message: "Account verified" });
};

export const login = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = req.body as any;

  const { token } = await loginUser(email, password);

  reply.send({ token });
};

export const forgotPasswordCtrl = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { email } = req.body as any;

  await forgotPassword(email);

  reply.send({ message: "If user exists, reset email sent" });
};

export const resetPasswordCtrl = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { token, password } = req.body as any;

  await resetPassword(token, password);

  reply.send({ message: "Password reset successful" });
};
