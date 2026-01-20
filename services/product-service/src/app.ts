import Fastify from "fastify";
import mongoose from "mongoose";
import { env } from "./env";
import { productRoutes } from "./routes/product.routes";
import { authPlugin } from "./plugins/auth";
import { connectProducer } from "./kafka/producer";

export const buildApp = async () => {
  const app = Fastify({ logger: true });

  // ✅ PUBLIC
  app.get("/health", async () => {
    return { status: "ok", service: "product-service" };
  });

  await mongoose.connect(env.MONGO_URI);
  await connectProducer();

  // 🔐 Protected routes
  app.register(authPlugin);
  app.register(productRoutes, { prefix: "/products" });

  return app;
};
