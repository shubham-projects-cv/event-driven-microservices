import { producer } from "../producer";
import { PRODUCT_TOPICS } from "../topics";

export const publishProductEvent = async (
  topic: keyof typeof PRODUCT_TOPICS,
  payload: Record<string, unknown>,
) => {
  await producer.send({
    topic: PRODUCT_TOPICS[topic],
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
