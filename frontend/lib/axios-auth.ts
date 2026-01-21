import axios from "axios";

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API, // http://localhost:4000
});

export default authApi;
