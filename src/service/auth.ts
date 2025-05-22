import axios from "axios";
import { saveToken } from "./tokenStorage";

const OAUTH_URL = "https://app.onebillsoftware.com/oauth/token";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function fetchToken() {
  try {
    const params = new URLSearchParams({
      grant_type: "password",
      client_id: "voicelogixsandbox",
      client_secret:
        "6773dc4b6a3c4a9d1213f533d7ba48273c681dc6bd1e6577739ff205a951cfc4",
      username: "pinelydevs.sbx",
      password:
        "f48fefa11d8ca7d13afd9ef1f20ee147d6b748f9487cd6f6a34450cd269f3f9e",
      scope: "trust",
    });

    const response = await axios.post<TokenResponse>(
      `${OAUTH_URL}?${params.toString()}`,
      null,
      { maxBodyLength: Infinity },
    );

    saveToken(response.data.access_token);
    return response.data;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
}
