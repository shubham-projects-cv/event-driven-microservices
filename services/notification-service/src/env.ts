import { z } from "zod";

const envSchema = z.object({
  KAFKA_BROKER: z.string(),
  EMAIL_FROM: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().transform(Number),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
});

export const env = envSchema.parse(process.env);
