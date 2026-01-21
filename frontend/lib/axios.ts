import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCT_API, // 4001
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
