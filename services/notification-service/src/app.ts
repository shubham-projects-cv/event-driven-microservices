import { startNotificationConsumer } from "./kafka/consumer";

export const start = async () => {
  console.log("🚀 Notification service starting...");
  await startNotificationConsumer();
  console.log("✅ Notification service ready");
};
