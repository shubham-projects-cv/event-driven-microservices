import Fastify from "fastify";
import mongoose from "mongoose";
import cors from "@fastify/cors";
import { env } from "./env";
import { productRoutes } from "./routes/product.routes";
import { authPlugin } from "./plugins/auth";
import { connectProducer } from "./kafka/producer";

export const buildApp = async () => {
  const app = Fastify({ logger: true });

  // ✅ CORS — THIS IS ENOUGH
  await app.register(cors, {
    origin: ["http://localhost:3000", "http://54.196.145.91:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  // ✅ PUBLIC
  app.get("/health", async () => {
    return { status: "ok", service: "product-service" };
  });

  // ✅ DB + Kafka
  await mongoose.connect(env.MONGO_URI);
  await connectProducer();

  // 🔐 Protected routes
  app.register(authPlugin);
  app.register(productRoutes, { prefix: "/products" });

  return app;
};
