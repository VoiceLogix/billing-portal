import axios, {
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getSessionTokens,
  authenticateUser,
  SessionTokens,
  baseURL,
} from "./tokenStorage";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10_000,
});

// Attach tokens before each request
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const { jsessionId, csrfToken } = await getSessionTokens();

      // Use the set method for AxiosHeaders
      config.headers.set("JSESSIONID", jsessionId);
      config.headers.set("X-XSRF-TOKEN", csrfToken);
    } catch (err) {
      console.warn("No session tokens available:", err);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// On 401: re-authenticate once, then retry original request
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError & { config: AxiosRequestConfig }) => {
    const original = error.config;
    if (error.response?.status === 401 && !original.headers!["x-retried"]) {
      if (original.headers && typeof original.headers.set === "function") {
        original.headers.set("x-retried", "1");
      } else if (original.headers) {
        (original.headers as Record<string, any>)["x-retried"] = "1";
      }

      try {
        const newTokens: SessionTokens = await authenticateUser();
        // Update headers on the retried request
        if (original.headers && typeof original.headers.set === "function") {
          original.headers.set("Cookie", `JSESSIONID=${newTokens.jsessionId}`);
          original.headers.set("X-XSRF-TOKEN", newTokens.csrfToken);
          original.headers.set("x-retried", "1");
        }
        return axiosInstance.request(original);
      } catch (authErr) {
        // if re-auth fails, fall through to rejection
        return Promise.reject(authErr);
      }
    }
    return Promise.reject(error);
  },
);
