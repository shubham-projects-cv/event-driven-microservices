import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["kafka:9092"], // HARDCODED – correct for docker network
});

const consumer = kafka.consumer({
  groupId: "notification-service",
});

export const startNotificationConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({ topic: "USER_OTP_CREATED", fromBeginning: false });
  await consumer.subscribe({ topic: "USER_LOGGED_IN", fromBeginning: false });
  await consumer.subscribe({
    topic: "PASSWORD_RESET_REQUESTED",
    fromBeginning: false,
  });
  await consumer.subscribe({ topic: "PRODUCT_CREATED", fromBeginning: false });
  await consumer.subscribe({ topic: "PRODUCT_UPDATED", fromBeginning: false });
  await consumer.subscribe({ topic: "PRODUCT_DELETED", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.value) return;

      const data = JSON.parse(message.value.toString());

      console.log("📩 NOTIFICATION EVENT");
      console.log("Topic:", topic);
      console.log("Data:", data);
    },
  });
};
