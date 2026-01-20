import { FastifyInstance } from "fastify";
import * as jwt from "jsonwebtoken";
import { env } from "../env";

export const authPlugin = async (app: FastifyInstance): Promise<void> => {
  app.addHook("preHandler", async (req) => {
    const header = req.headers.authorization;
    if (!header) {
      throw new Error("Unauthorized");
    }

    const token = header.replace("Bearer ", "");
    const payload = jwt.verify(token, env.JWT_SECRET);

    if (typeof payload !== "object" || payload === null) {
      throw new Error("Unauthorized");
    }

    req.user = {
      sub: String(payload.sub),
      email: String(payload.email),
    };
  });
};
