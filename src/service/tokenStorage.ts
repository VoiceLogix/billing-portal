import axios from "axios";

export const baseURL = "https://onebillapi.fly.dev";
// export const baseURL = "http://localhost:8080";
export const DEFAULT_SUBSCRIBER_ID = "SR2002";

export const AUTH_URL = `${baseURL}/auth`;

export function getNSToken(): string | null {
  if (import.meta.env.VITE_NODE_ENV === "development") {
    return import.meta.env.VITE_NS_TOKEN || null;
  }
  return localStorage.getItem("ns_t");
}

export interface SessionTokens {
  jsessionId: string;
  csrfToken: string;
}

export async function getSessionTokens(): Promise<SessionTokens> {
  const jsessionId = localStorage.getItem("JSESSIONID");
  const csrfToken = localStorage.getItem("CSRF-TOKEN");

  if (jsessionId && csrfToken) {
    return { jsessionId, csrfToken };
  }

  // no tokens — authenticate
  return authenticateUser();
}

export async function authenticateUser(): Promise<SessionTokens> {
  const onebillSubscriberId =
    localStorage.getItem("onebillSubscriberId") || DEFAULT_SUBSCRIBER_ID;

  const nsToken = getNSToken();
  if (!nsToken) {
    throw new Error("Missing ns_t (OneBill API) token");
  }

  try {
    const { data } = await axios.get<SessionTokens>(
      `${AUTH_URL}/${onebillSubscriberId}`,
      {
        headers: { Authorization: `Bearer ${nsToken}` },
      },
    );

    const { jsessionId, csrfToken } = data;
    if (!jsessionId || !csrfToken) {
      throw new Error("Auth response missing jsessionId or csrfToken");
    }

    localStorage.setItem("JSESSIONID", jsessionId);
    localStorage.setItem("CSRF-TOKEN", csrfToken);
    return data;
  } catch (err: any) {
    console.error("authenticateUser error:", err);
    throw new Error("Authentication failed; please log in again.");
  }
}
