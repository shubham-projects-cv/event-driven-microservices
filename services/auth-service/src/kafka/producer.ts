import { Kafka } from "kafkajs";
import { env } from "../config/env";

export const kafka = new Kafka({
  clientId: "auth-service",
  brokers: [env.KAFKA_BROKER],
});

export const producer = kafka.producer();

export const connectProducer = async () => {
  await producer.connect();
};
