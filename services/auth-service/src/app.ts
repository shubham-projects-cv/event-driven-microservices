import Fastify from "fastify";
import cors from "@fastify/cors";
import mongoose from "mongoose";

import { env } from "./config/env";
import { authRoutes } from "./routes/auth.routes";
import { connectProducer } from "./kafka/producer";

export const buildApp = async () => {
  const app = Fastify({ logger: true });

  // ✅ CORS — THIS IS THE FIX
  await app.register(cors, {
    origin: [
      "http://localhost:3000",
      "http://54.196.145.91:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  // MongoDB
  await mongoose.connect(env.MONGO_URI);

  // Kafka
  await connectProducer();

  // Routes
  app.register(authRoutes, { prefix: "/auth" });

  app.get("/health", async () => {
    return { status: "ok", service: "auth-service" };
  });

  return app;
};
