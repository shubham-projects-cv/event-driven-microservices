import axios from "axios";

const productApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCT_API, // http://localhost:4001
});

productApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default productApi;
