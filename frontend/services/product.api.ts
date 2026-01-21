import { api } from "@/lib/axios";

export const getProducts = () => api.get("/products").then((res) => res.data);

export const createProduct = (data: {
  name: string;
  price: number;
  description?: string;
}) => api.post("/products", data);

export const updateProduct = (
  id: string,
  data: { name?: string; price?: number },
) => api.put(`/products/${id}`, data);

export const deleteProduct = (id: string) => api.delete(`/products/${id}`);
