import axios from "axios";
import {
  saveToken,
  getStoredToken,
  clearToken,
  StoredToken,
} from "./tokenStorage";

const OAUTH_URL = "http://localhost:4000/getOneBillToken";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

async function fetchNewToken(): Promise<StoredToken> {
  let ns_t = localStorage.getItem("ns_t");

  if (import.meta.env?.VITE_NODE_ENV === "development") {
    ns_t = import.meta.env.VITE_NS_TOKEN;
  }
  if (!ns_t) {
    throw new Error("No ns_t found in localStorage or environment variables.");
  }

  const resp = await axios.get<TokenResponse>(OAUTH_URL, {
    headers: {
      Authorization: `Bearer ${ns_t}`,
    },
  });

  const data = resp.data;
  const expiresAt = Date.now() + data.expires_in * 1000;

  const stored: StoredToken = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt,
    tokenType: data.token_type,
    scope: data.scope,
  };

  saveToken(stored);
  return stored;
}

export async function getValidAccessToken(): Promise<string> {
  let st = getStoredToken();

  if (!st) {
    st = await fetchNewToken();
    return st.accessToken;
  }

  if (Date.now() > st.expiresAt - 60_000) {
    if (!st.refreshToken) {
      st = await fetchNewToken();
    } else {
      try {
        st = await fetchNewToken();
      } catch {
        clearToken();
        st = await fetchNewToken();
      }
    }
  }

  return st.accessToken;
}
