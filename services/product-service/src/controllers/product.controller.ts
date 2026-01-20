import { FastifyRequest, FastifyReply } from "fastify";
import {
  createProduct,
  listProducts,
  updateProduct,
  deleteProduct,
} from "../services/product.service";

export const createCtrl = async (req: FastifyRequest, reply: FastifyReply) => {
  const { name, price } = req.body as { name: string; price: number };
  const userId = (req as any).user.sub;
  const product = await createProduct(userId, name, price);
  reply.code(201).send(product);
};

export const listCtrl = async (req: FastifyRequest) => {
  const { search, minPrice, maxPrice } = req.query as any;
  const userId = (req as any).user.sub;
  return listProducts(
    userId,
    search,
    minPrice ? Number(minPrice) : undefined,
    maxPrice ? Number(maxPrice) : undefined,
  );
};

export const updateCtrl = async (req: FastifyRequest) => {
  const { id } = req.params as { id: string };
  const { name, price } = req.body as { name: string; price: number };
  const userId = (req as any).user.sub;
  return updateProduct(userId, id, name, price);
};

export const deleteCtrl = async (req: FastifyRequest) => {
  const { id } = req.params as { id: string };
  const userId = (req as any).user.sub;
  await deleteProduct(userId, id);
  return { success: true };
};
