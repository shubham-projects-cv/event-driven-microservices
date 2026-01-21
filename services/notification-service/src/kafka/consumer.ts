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

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.value) return;

      const data = JSON.parse(message.value.toString());

      console.log("📩 EVENT:", topic, data);

      // ✅ OTP EMAIL
      if (topic === TOPICS.USER_OTP_CREATED) {
        await transporter.sendMail({
          from: env.EMAIL_FROM,
          to: data.payload.email, // 🔥 FIX
          subject: "Verify your account",
          html: `<h2>Your OTP is ${data.payload.otp}</h2>`,
        });
      }

      // ✅ LOGIN ALERT
      if (topic === TOPICS.USER_LOGGED_IN) {
        await transporter.sendMail({
          from: env.EMAIL_FROM,
          to: data.payload.email, // 🔥 FIX
          subject: "Login Alert",
          html: `<p>You logged in successfully.</p>`,
        });
      }

      // ✅ PASSWORD RESET
      if (topic === TOPICS.PASSWORD_RESET_REQUESTED) {
        await transporter.sendMail({
          from: env.EMAIL_FROM,
          to: data.payload.email, // 🔥 FIX
          subject: "Reset Password",
          html: `<p>Reset token: ${data.payload.token}</p>`,
        });
      }
    },
  });
};
