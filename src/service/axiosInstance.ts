import axios from "axios";
import { getToken } from "./tokenStorage";

export const axiosInstance = axios.create({
  baseURL: "https://app.onebillsoftware.com",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
