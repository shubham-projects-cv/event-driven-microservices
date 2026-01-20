import { consumer } from "../consumer";
import { AUTH_EVENTS } from "../topics";

export const startAuthConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topic: AUTH_EVENTS,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;

      const data = JSON.parse(message.value.toString());
      console.log("AUTH EVENT RECEIVED:", data);
    },
  });
};
