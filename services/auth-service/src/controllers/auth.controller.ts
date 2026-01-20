import { FastifyReply, FastifyRequest } from "fastify";
import {
  forgotPassword,
  registerUser,
  resetPassword,
} from "../services/auth.service";
import { verifyOtp, loginUser } from "../services/auth.service";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const { name, email, password } = request.body as {
      name: string;
      email: string;
      password: string;
    };

    await registerUser(name, email, password);
    reply.code(201).send({ message: "OTP sent to email" });
  } catch (error) {
    reply.send(error);
  }
};

export const verifyOtpCtrl = async (req: any, reply: any) => {
  const { email, otp } = req.body as { email: string; otp: string };
  await verifyOtp(email, otp);
  reply.send({ message: "Verified" });
};

export const loginCtrl = async (req: any, reply: any) => {
  const { email, password } = req.body as { email: string; password: string };
  const token = await loginUser(email, password);
  reply.send({ token });
};

export const forgotPasswordCtrl = async (req: any, reply: any) => {
  const { email } = req.body as { email: string };
  await forgotPassword(email);
  reply.send({ message: "If registered, reset link sent" });
};

export const resetPasswordCtrl = async (req: any, reply: any) => {
  const { token, password } = req.body as { token: string; password: string };
  await resetPassword(token, password);
  reply.send({ message: "Password updated" });
};
