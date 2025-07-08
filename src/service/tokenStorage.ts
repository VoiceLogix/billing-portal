import axios from "axios";
import { BillingAuthResponse } from "../types/BillingSubscriberResult";

export const baseURL = "https://sb-manage.unitydial.com/billing-api/";
// export const baseURL = "https://onebillapi.fly.dsev/";
// export const baseURL = "http://localhost:8085/";
export const AUTH_URL = `${baseURL}auth`;

export const LS_KEY_USER_AUTH = "onebill_user_auth";
const LS_KEY_NS_TOKEN = "ns_t";
const ENV_NS_TOKEN = "VITE_NS_TOKEN";

export interface SessionTokens {
  jsessionId: string;
  csrfToken: string;
}

function loadCachedAuth(nsToken: string | null): SessionTokens | null {
  if (!nsToken) return null;
  const raw = localStorage.getItem(LS_KEY_USER_AUTH);
  if (!raw) return null;

  let parsed: any;
  try {
    parsed = JSON.parse(raw);
  } catch {
    localStorage.removeItem(LS_KEY_USER_AUTH);
    return null;
  }

  if (
    typeof parsed !== "object" ||
    parsed.nsToken !== nsToken ||
    typeof parsed.jsessionId !== "string" ||
    typeof parsed.csrfToken !== "string"
  ) {
    return null;
  }

  return {
    jsessionId: parsed.jsessionId,
    csrfToken: parsed.csrfToken,
  };
}

export function getNsToken(): string | null {
  const mode = import.meta.env.VITE_NODE_ENV;
  if (mode === "development") {
    return (import.meta.env[ENV_NS_TOKEN] as string) || null;
  }
  return localStorage.getItem(LS_KEY_NS_TOKEN);
}

export async function getSessionTokens(): Promise<SessionTokens> {
  const nsToken = getNsToken();
  const cached = loadCachedAuth(nsToken);
  if (cached) {
    console.log("Using cached session tokens");
    return cached;
  }
  return authenticateUser();
}

export async function authenticateUser(): Promise<SessionTokens> {
  const nsToken = getNsToken();

  const cached = loadCachedAuth(nsToken);
  if (cached) {
    console.log("Using cached session tokens");
    return cached;
  }
  if (!nsToken) {
    throw new Error("Missing NS token (ns_t) in localStorage or environment");
  }

  try {
    const response = await axios.get<BillingAuthResponse>(AUTH_URL, {
      headers: { Authorization: `Bearer ${nsToken}` },
    });
    const data = response.data;
    console.log("authenticateUser", data);

    if (!data.jsessionId || !data.csrfToken) {
      throw new Error("Received incomplete session tokens from API");
    }

    const toStore = {
      nsToken,
      jsessionId: data.jsessionId,
      csrfToken: data.csrfToken,
      subscriberData: data.subscriberData,
    };
    localStorage.setItem(LS_KEY_USER_AUTH, JSON.stringify(toStore));

    return {
      jsessionId: data.jsessionId,
      csrfToken: data.csrfToken,
    };
  } catch (err: any) {
    localStorage.removeItem(LS_KEY_USER_AUTH);
    throw new Error("Authentication failed; server returned an error.");
  }
}
