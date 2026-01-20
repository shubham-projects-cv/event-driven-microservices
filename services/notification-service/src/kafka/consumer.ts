import { Kafka } from "kafkajs";
import { env } from "../env";

const kafka = new Kafka({
  brokers: [env.KAFKA_BROKER],
});

export const consumer = kafka.consumer({ groupId: "notification-service" });

export const connectConsumer = async (): Promise<void> => {
  await consumer.connect();
};
