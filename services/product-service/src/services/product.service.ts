import { Product } from "../models/product.model";

export const createProduct = async (
  userId: string,
  name: string,
  price: number,
  description?: string,
) => {
  return Product.create({
    userId,
    name,
    price,
    description,
  });
};

export const listProducts = async (userId: string) => {
  return Product.find({ userId });
};

export const updateProduct = async (
  userId: string,
  productId: string,
  name?: string,
  price?: number,
  description?: string,
) => {
  const product = await Product.findOne({
    _id: productId,
    userId,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (description !== undefined) product.description = description;

  await product.save();
  return product;
};

// export const deleteProduct = async (userId: string, productId: string) => {
//   const product = await Product.findOneAndDelete({
//     _id: productId,
//     userId,
//   });

//   if (!product) {
//     throw new Error("Product not found");
//   }
// };

export const deleteProduct = async (userId: string, id: string) => {
  const product = await Product.findOneAndDelete({
    _id: id,
    userId,
  });

  if (!product) {
    throw new Error("Product not found");
  }
};
