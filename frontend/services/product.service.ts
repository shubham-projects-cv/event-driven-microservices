import productApi from "@/lib/axios-product";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
}

/* GET ALL */
export const getProducts = async (): Promise<Product[]> => {
  const res = await productApi.get("/products");
  return res.data;
};

/* GET ONE */
export const getProduct = async (id: string): Promise<Product> => {
  const res = await productApi.get(`/products/${id}`);
  return res.data;
};

/* CREATE */
export const createProduct = async (
  data: Omit<Product, "_id">,
): Promise<Product> => {
  const res = await productApi.post("/products", data);
  return res.data;
};

/* UPDATE */
export const updateProduct = async (
  id: string,
  data: Partial<Product>,
): Promise<Product> => {
  const res = await productApi.put(`/products/${id}`, data);
  return res.data;
};

/* DELETE */
export const deleteProduct = async (id: string): Promise<void> => {
  await productApi.delete(`/products/${id}`);
};
