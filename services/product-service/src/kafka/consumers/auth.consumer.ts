import { consumer } from "../consumer";
import { AUTH_TOPICS } from "../topics";

export const startAuthConsumer = async () => {
  await consumer.subscribe({
    topic: AUTH_TOPICS.USER_LOGGED_IN,
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.value) return;

      const data = JSON.parse(message.value.toString());
      console.log("AUTH EVENT RECEIVED:", topic, data);
    },
  });
};
