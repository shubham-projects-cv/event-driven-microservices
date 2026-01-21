import { FastifyRequest, FastifyReply } from "fastify";
import * as jwt from "jsonwebtoken";
import { env } from "../env";

interface JwtPayload {
  sub: string;
  email: string;
}

export const authMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    req.user = {
      sub: decoded.sub,
      email: decoded.email,
    };
  } catch (error) {
    return reply.status(401).send({ message: "Invalid or expired token" });
  }
};
