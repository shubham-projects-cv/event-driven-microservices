import { Kafka } from "kafkajs";
import { env } from "../env";

const kafka = new Kafka({
  brokers: [env.KAFKA_BROKER],
});

export const producer = kafka.producer();

export const connectProducer = async (): Promise<void> => {
  await producer.connect();
};
