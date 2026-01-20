import { Kafka } from "kafkajs";
import { env } from "../env";

const kafka = new Kafka({
  clientId: "product-service",
  brokers: [env.KAFKA_BROKER],
});

export const consumer = kafka.consumer({
  groupId: "product-service-group",
});
