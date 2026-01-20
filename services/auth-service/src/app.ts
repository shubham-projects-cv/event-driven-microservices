import Fastify from "fastify";
import mongoose from "mongoose";

import { env } from "./config/env";
import { authRoutes } from "./routes/auth.routes";
import { connectProducer } from "./kafka/producer";

export const buildApp = async () => {
  const app = Fastify({ logger: true });

  // MongoDB connection
  await mongoose.connect(env.MONGO_URI);

  // Kafka producer connection
  await connectProducer();

  // Health check
  app.get("/health", async () => {
    return { status: "ok", service: "auth-service" };
  });

  // Routes
  app.register(authRoutes, { prefix: "/auth" });

  return app;
};
