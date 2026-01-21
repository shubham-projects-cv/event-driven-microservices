import { Kafka } from "kafkajs";
import { env } from "../env";

export const kafka = new Kafka({
  clientId: "product-service",
  brokers: [env.KAFKA_BROKER],
});

export const producer = kafka.producer();

export const connectProducer = async () => {
  await producer.connect();
};
