import { FastifyRequest, FastifyReply } from "fastify";
import {
  createProduct,
  listProducts,
  updateProduct,
  deleteProduct,
} from "../services/product.service";
import { publishProductEvent } from "../kafka/publishers/product.publisher";

export const createCtrl = async (req: FastifyRequest, reply: FastifyReply) => {
  const { name, price, description } = req.body as {
    name: string;
    price: number;
    description?: string;
  };

  const userId = (req as any).user.sub;

  const product = await createProduct(userId, name, price, description);

  await publishProductEvent("PRODUCT_CREATED", {
    productId: product._id.toString(),
    userId,
  });

  reply.code(201).send(product);
};

export const listCtrl = async (req: FastifyRequest) => {
  const userId = (req as any).user.sub;
  return listProducts(userId);
};

export const updateCtrl = async (req: FastifyRequest) => {
  const { id } = req.params as { id: string };
  const { name, price, description } = req.body as any;
  const userId = (req as any).user.sub;

  const product = await updateProduct(userId, id, name, price, description);

  await publishProductEvent("PRODUCT_UPDATED", {
    productId: id,
    userId,
  });

  return product;
};

export const deleteCtrl = async (req: FastifyRequest) => {
  const { id } = req.params as { id: string };
  const userId = (req as any).user.sub;

  await deleteProduct(userId, id);

  await publishProductEvent("PRODUCT_DELETED", {
    productId: id,
    userId,
  });

  return { success: true };
};
