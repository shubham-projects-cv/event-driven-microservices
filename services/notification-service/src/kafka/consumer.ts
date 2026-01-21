import { Kafka } from "kafkajs";
import { env } from "../env";
import { TOPICS } from "./topics";

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: [env.KAFKA_BROKER],
});

export const consumer = kafka.consumer({
  groupId: "notification-service",
});

export const startNotificationConsumer = async () => {
  await consumer.connect();

  // 🔥 SUBSCRIBE FIRST — ALWAYS
  await consumer.subscribe({ topic: TOPICS.USER_OTP_CREATED });
  await consumer.subscribe({ topic: TOPICS.USER_LOGGED_IN });
  await consumer.subscribe({ topic: TOPICS.PASSWORD_RESET_REQUESTED });
  await consumer.subscribe({ topic: TOPICS.PRODUCT_CREATED });
  await consumer.subscribe({ topic: TOPICS.PRODUCT_UPDATED });
  await consumer.subscribe({ topic: TOPICS.PRODUCT_DELETED });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const data = JSON.parse(message.value!.toString());

      console.log("📩 NOTIFICATION EVENT");
      console.log("Topic:", topic);
      console.log("Data:", data);
    },
  });
};
