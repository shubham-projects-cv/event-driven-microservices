import { Kafka } from "kafkajs";
import { env } from "../env";
import { TOPICS } from "./topics";
import { transporter } from "../mailer";

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: [env.KAFKA_BROKER],
});

export const consumer = kafka.consumer({
  groupId: "notification-service",
});

export const startNotificationConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({ topic: TOPICS.USER_OTP_CREATED });
  await consumer.subscribe({ topic: TOPICS.USER_LOGGED_IN });
  await consumer.subscribe({ topic: TOPICS.PASSWORD_RESET_REQUESTED });

  await consumer.subscribe({ topic: TOPICS.PRODUCT_CREATED });
  await consumer.subscribe({ topic: TOPICS.PRODUCT_UPDATED });
  await consumer.subscribe({ topic: TOPICS.PRODUCT_DELETED });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.value) return;

      const data = JSON.parse(message.value.toString());
      const { payload } = data;

      console.log("📩 EVENT:", topic, payload);

      /* 🔐 OTP */
      if (topic === TOPICS.USER_OTP_CREATED) {
        await transporter.sendMail({
          from: env.EMAIL_FROM,
          to: payload.email,
          subject: "Verify your account",
          html: `<h2>Your OTP is ${payload.otp}</h2>`,
        });
      }

      /* 🔑 LOGIN */
      if (topic === TOPICS.USER_LOGGED_IN) {
        await transporter.sendMail({
          from: env.EMAIL_FROM,
          to: payload.email,
          subject: "Login Alert",
          html: `<p>You logged in successfully.</p>`,
        });
      }

      /* 🔁 RESET */
      if (topic === TOPICS.PASSWORD_RESET_REQUESTED) {
        await transporter.sendMail({
          from: env.EMAIL_FROM,
          to: payload.email,
          subject: "Reset Password",
          html: `<p>Reset token: ${payload.token}</p>`,
        });
      }

      /* 🆕 PRODUCT CREATED */
      if (topic === TOPICS.PRODUCT_CREATED) {
        await transporter.sendMail({
          from: env.EMAIL_FROM,
          to: payload.email,
          subject: "Product Created",
          html: `<p>Your product has been created successfully.</p>`,
        });
      }

      /* ✏️ PRODUCT UPDATED */
      if (topic === TOPICS.PRODUCT_UPDATED) {
        await transporter.sendMail({
          from: env.EMAIL_FROM,
          to: payload.email,
          subject: "Product Updated",
          html: `<p>Your product has been updated.</p>`,
        });
      }

      /* 🗑️ PRODUCT DELETED */
      if (topic === TOPICS.PRODUCT_DELETED) {
        await transporter.sendMail({
          from: env.EMAIL_FROM,
          to: payload.email,
          subject: "Product Deleted",
          html: `<p>Your product has been deleted.</p>`,
        });
      }
    },
  });
};
