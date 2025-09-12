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
} from "./billing_center/tokenStorage";

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

axiosInstance.interceptors.response.use(
  async (res) => {
    // If server answers “Invalid request.” with a 200, treat it like an auth failure
    const isInvalidRequest =
      res.status === 200 &&
      typeof res.data === "string" &&
      res.data.trim() === "Invalid request.";

    const originalReq = res.config as AxiosRequestConfig & {
      _retried?: boolean;
    };

    if (isInvalidRequest && !originalReq._retried) {
      originalReq._retried = true;

      try {
        // Re‐authenticate and grab new session tokens
        const newTokens = await authenticateUser();

        // Patch the headers on the original request
        if (
          originalReq.headers &&
          typeof (originalReq.headers as any).set === "function"
        ) {
          (originalReq.headers as any).set(
            "Cookie",
            `JSESSIONID=${newTokens.jsessionId}`,
          );
          (originalReq.headers as any).set("X-XSRF-TOKEN", newTokens.csrfToken);
        } else if (originalReq.headers) {
          (originalReq.headers as Record<string, string>)[
            "Cookie"
          ] = `JSESSIONID=${newTokens.jsessionId}`;
          (originalReq.headers as Record<string, string>)["X-XSRF-TOKEN"] =
            newTokens.csrfToken;
        }

        // Replay the request with fresh tokens
        return axiosInstance.request(originalReq);
      } catch (authErr) {
        // If re‐auth fails, let the error bubble
        return Promise.reject(authErr);
      }
    }

    // Otherwise just pass through
    return res;
  },
  // You can leave your error‐handler here as before, or reject directly
  (error: AxiosError) => Promise.reject(error),
);
