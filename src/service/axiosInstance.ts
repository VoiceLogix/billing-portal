// axiosInstance.ts

import axios, { AxiosRequestConfig, AxiosError, AxiosHeaders } from "axios";
import { getValidAccessToken } from "./auth";
import { clearToken } from "./tokenStorage";

export const axiosInstance = axios.create({
  baseURL: "https://app.onebillsoftware.com",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getValidAccessToken();

    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (
    error: AxiosError & {
      config?: AxiosRequestConfig & { _retry?: boolean };
    },
  ) => {
    const config = error.config;
    if (error.response?.status === 401 && config && !config._retry) {
      config._retry = true;

      clearToken();
      const token = await getValidAccessToken();

      config.headers = config.headers
        ? new AxiosHeaders(config.headers)
        : new AxiosHeaders();

      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);

      return axiosInstance(config);
    }

    return Promise.reject(error);
  },
);
