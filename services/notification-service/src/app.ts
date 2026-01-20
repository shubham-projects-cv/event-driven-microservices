import { consumer, connectConsumer } from "./kafka/consumer";
import { sendOtpEmail, sendProductMail } from "./handlers";

export const start = async (): Promise<void> => {
  await connectConsumer();

  await consumer.subscribe({ topic: "USER_OTP_CREATED" });
  await consumer.subscribe({ topic: "PRODUCT_CREATED" });
  await consumer.subscribe({ topic: "PRODUCT_UPDATED" });
  await consumer.subscribe({ topic: "PRODUCT_DELETED" });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.value) return;
      const data = JSON.parse(message.value.toString());

      if (topic === "USER_OTP_CREATED") {
        await sendOtpEmail(data.email, data.otp);
      }

      if (topic.startsWith("PRODUCT_")) {
        await sendProductMail(
          data.userId,
          `Product ${topic.replace("PRODUCT_", "").toLowerCase()}`,
        );
      }
    },
  });
};
