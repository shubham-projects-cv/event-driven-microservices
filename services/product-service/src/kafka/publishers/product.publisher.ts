import { producer } from "../producer";

export const publishProductEvent = async (
  type: string,
  payload: Record<string, any>,
) => {
  await producer.send({
    topic: "product.events",
    messages: [
      {
        value: JSON.stringify({
          type,
          payload,
          timestamp: new Date().toISOString(),
        }),
      },
    ],
  });
};
