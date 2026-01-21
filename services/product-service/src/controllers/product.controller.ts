import { FastifyRequest, FastifyReply } from "fastify";
import {
  createProduct,
  listProducts,
  updateProduct,
  deleteProduct,
} from "../services/product.service";
import { publishProductEvent } from "../kafka/publishers/product.publisher";

// CREATE PRODUCT
export const createCtrl = async (req: FastifyRequest, reply: FastifyReply) => {
  const { name, price } = req.body as {
    name: string;
    price: number;
  };

  const userId = (req as any).user.sub as string;

  const product = await createProduct(userId, name, price);

  await publishProductEvent("CREATED", {
    productId: product._id.toString(),
    userId,
    name: product.name,
    price: product.price,
  });

  reply.code(201).send(product);
};

// LIST PRODUCTS
export const listCtrl = async (req: FastifyRequest) => {
  const { search, minPrice, maxPrice } = req.query as {
    search?: string;
    minPrice?: string;
    maxPrice?: string;
  };

  const userId = (req as any).user.sub as string;

  return listProducts(
    userId,
    search,
    minPrice ? Number(minPrice) : undefined,
    maxPrice ? Number(maxPrice) : undefined,
  );
};

// UPDATE PRODUCT
export const updateCtrl = async (req: FastifyRequest) => {
  const { id } = req.params as { id: string };

  const body = req.body as {
    name?: string;
    price?: number;
  };

  const userId = (req as any).user.sub as string;

  if (body.name === undefined && body.price === undefined) {
    throw new Error("At least one field (name or price) is required");
  }

  const product = await updateProduct(
    userId,
    id,
    body.name ?? null,
    body.price ?? null,
  );

  await publishProductEvent("UPDATED", {
    productId: product._id.toString(),
    userId,
  });

  return product;
};

// DELETE PRODUCT
export const deleteCtrl = async (req: FastifyRequest) => {
  const { id } = req.params as { id: string };
  const userId = (req as any).user.sub as string;

  await deleteProduct(userId, id);

  await publishProductEvent("DELETED", {
    productId: id,
    userId,
  });

  return { success: true };
};
