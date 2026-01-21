import Fastify from "fastify";
import mongoose from "mongoose";
import cors from "@fastify/cors";
import { env } from "./env";
import { productRoutes } from "./routes/product.routes";
import { authPlugin } from "./plugins/auth";
import { connectProducer } from "./kafka/producer";

export const buildApp = async () => {
  const app = Fastify({ logger: true });

  // ✅ CORS (MUST be FIRST)
  await app.register(cors, {
    origin: ["http://localhost:3000", "https://microservices-frontend-woad.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  // ✅ Allow preflight explicitly (safe for Fastify)
  app.options("*", async (_request, reply) => {
    reply.send();
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
