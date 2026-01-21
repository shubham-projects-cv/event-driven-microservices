import api from "@/lib/axios";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products");
  return res.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (
  data: Omit<Product, "_id">,
): Promise<Product> => {
  const res = await api.post("/products", data);
  return res.data;
};

export const updateProduct = async (
  id: string,
  data: Partial<Product>,
): Promise<Product> => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
