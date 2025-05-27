export const ONE_BILL_TOKEN = "onebill_access";

export interface StoredToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  tokenType?: string;
  scope?: string;
}

export function saveToken(stored: StoredToken) {
  localStorage.setItem(ONE_BILL_TOKEN, JSON.stringify(stored));
}

export function getStoredToken(): StoredToken | null {
  const raw = localStorage.getItem(ONE_BILL_TOKEN);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredToken;
  } catch {
    localStorage.removeItem(ONE_BILL_TOKEN);
    return null;
  }
}

export function clearToken() {
  localStorage.removeItem(ONE_BILL_TOKEN);
}
