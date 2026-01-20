import { buildApp } from "./app";
import { env } from "./config/env";

const start = async (): Promise<void> => {
  const app = await buildApp();
  await app.listen({ port: env.AUTH_SERVICE_PORT, host: "0.0.0.0" });
};

start();
