import { buildApp } from "./app";
import { env } from "./env";

const start = async () => {
  const app = await buildApp();

  await app.listen({
    port: env.PRODUCT_SERVICE_PORT,
    host: "0.0.0.0",
  });

  app.log.info(`Product service running on port ${env.PRODUCT_SERVICE_PORT}`);
};

start();
