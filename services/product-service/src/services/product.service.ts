import { Product } from "../models/product.model";
import { AppError } from "../utils/errors";
import { producer } from "../kafka/producer";

export const createProduct = async (
  userId: string,
  name: string,
  price: number,
) => {
  const product = await Product.create({ userId, name, price });

  await producer.send({
    topic: "PRODUCT_CREATED",
    messages: [{ value: JSON.stringify({ userId, name }) }],
  });

  return product;
};

export const listProducts = async (
  userId: string,
  search?: string,
  minPrice?: number,
  maxPrice?: number,
) => {
  const query: Record<string, unknown> = { userId };

  if (search) query.name = { $regex: search, $options: "i" };
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined) (query.price as any).$gte = minPrice;
    if (maxPrice !== undefined) (query.price as any).$lte = maxPrice;
  }

  return Product.find(query).sort({ createdAt: -1 });
};

export const updateProduct = async (
  userId: string,
  productId: string,
  name: string | null,
  price: number | null,
) => {
  const product = await Product.findOne({
    _id: productId,
    userId,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (name !== null) {
    product.name = name;
  }

  if (price !== null) {
    product.price = price;
  }

  await product.save();
  return product;
};

export const deleteProduct = async (userId: string, productId: string) => {
  const product = await Product.findOneAndDelete({ _id: productId, userId });
  if (!product) throw new AppError("Not found", 404);

  await producer.send({
    topic: "PRODUCT_DELETED",
    messages: [{ value: JSON.stringify({ userId, name: product.name }) }],
  });
};
