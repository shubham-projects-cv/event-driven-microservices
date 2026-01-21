import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";

/* =======================
   Types
======================= */

export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductInput {
  name: string;
  price: number;
  description?: string;
}

export interface UpdateProductInput {
  name: string;
  price: number;
  description?: string;
}

/* =======================
   Axios instance
======================= */

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* =======================
   API functions
======================= */

export const createProduct = async (
  data: CreateProductInput,
): Promise<Product> => {
  const res = await api.post<Product>("/products", data);
  return res.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
};

export const updateProduct = async (
  id: string,
  data: UpdateProductInput,
): Promise<Product> => {
  const res = await api.put<Product>(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products");
  return res.data;
};
