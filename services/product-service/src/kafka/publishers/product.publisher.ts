import { producer } from "../producer";

export const publishProductEvent = async (
  topic: "PRODUCT_CREATED" | "PRODUCT_UPDATED" | "PRODUCT_DELETED",
  payload: Record<string, any>,
) => {
  await producer.send({
    topic,
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
