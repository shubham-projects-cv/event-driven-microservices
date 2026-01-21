import { FastifyRequest, FastifyReply } from "fastify";
import {
  createProduct,
  listProducts,
  updateProduct,
  deleteProduct,
} from "../services/product.service";
import { publishProductEvent } from "../kafka/publishers/product.publisher";

/* CREATE */
export const createCtrl = async (req: FastifyRequest, reply: FastifyReply) => {
  const { name, price, description } = req.body as {
    name: string;
    price: number;
    description?: string;
  };

  const user = (req as any).user;
  const userId = user.sub;
  const email = user.email;

  const product = await createProduct(userId, name, price, description);

  await publishProductEvent("PRODUCT_CREATED", {
    productId: product._id.toString(),
    userId,
    email,
  });

  reply.code(201).send(product);
};

/* LIST */
export const listCtrl = async (req: FastifyRequest) => {
  const userId = (req as any).user.sub;
  return listProducts(userId);
};

/* UPDATE */
export const updateCtrl = async (req: FastifyRequest) => {
  const { id } = req.params as { id: string };
  const { name, price, description } = req.body as {
    name?: string;
    price?: number;
    description?: string;
  };

  const user = (req as any).user;
  const userId = user.sub;
  const email = user.email;

  const product = await updateProduct(userId, id, name, price, description);

  await publishProductEvent("PRODUCT_UPDATED", {
    productId: id,
    userId,
    email,
  });

  return product;
};

/* DELETE */
export const deleteCtrl = async (req: FastifyRequest) => {
  const { id } = req.params as { id: string };

  const user = (req as any).user;
  const userId = user.sub;
  const email = user.email;

  await deleteProduct(userId, id);

  await publishProductEvent("PRODUCT_DELETED", {
    productId: id,
    userId,
    email,
  });

  return { success: true };
};
