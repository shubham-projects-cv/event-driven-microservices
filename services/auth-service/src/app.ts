import Fastify from "fastify";
import mongoose from "mongoose";
import { env } from "./config/env";
import { authRoutes } from "./routes/auth.routes";
import { connectProducer } from "./kafka/producer";

export const buildApp = async () => {
  const app = Fastify({ logger: true });

  await mongoose.connect(env.MONGO_URI);
  await connectProducer();

  app.get("/health", async () => {
    return { status: "ok", service: "auth-service" };
  });

  app.register(authRoutes, { prefix: "/auth" });

  return app;
};
