import { z } from "zod";

const envSchema = z.object({
  PRODUCT_SERVICE_PORT: z.string().transform(Number),
  MONGO_URI: z.string().url(),
  JWT_SECRET: z.string(),
  KAFKA_BROKER: z.string(),
});

export const env = envSchema.parse(process.env);
