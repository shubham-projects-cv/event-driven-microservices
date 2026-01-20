import { startNotificationConsumer } from "./kafka/consumer";

export const start = async (): Promise<void> => {
  console.log("🚀 Notification service starting...");

  await startNotificationConsumer();

  console.log("✅ Notification service ready");
};
