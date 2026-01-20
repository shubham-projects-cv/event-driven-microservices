import { producer } from "../producer";
import { AUTH_TOPICS } from "../topics";

export const publishAuthEvent = async (
  topic: keyof typeof AUTH_TOPICS,
  payload: Record<string, any>,
) => {
  await producer.send({
    topic: AUTH_TOPICS[topic],
    messages: [
      {
        value: JSON.stringify({
          payload,
          timestamp: new Date().toISOString(),
        }),
      },
    ],
  });
};
