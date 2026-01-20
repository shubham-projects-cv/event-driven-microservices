import Fastify from "fastify";
import mongoose from "mongoose";
import { authRoutes } from "./routes/auth.routes";
import { env } from "./config/env";
import { connectProducer } from "./kafka/producer";

export const buildApp = async () => {
  const app = Fastify({ logger: true });

  await mongoose.connect(env.MONGO_URI);
  await connectProducer();

  app.register(authRoutes, { prefix: "/auth" });

  return app;
};
