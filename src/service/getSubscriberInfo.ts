import { BillingAuthResponse } from "../types/BillingSubscriberResult";
import { useQuery } from "@tanstack/react-query";
import { LS_KEY_USER_AUTH } from "./tokenStorage";

export async function getSubscriberInfo() {
  try {
    const auth = localStorage.getItem(LS_KEY_USER_AUTH);
    const authData = JSON.parse(auth || "{}") as BillingAuthResponse;
    return authData.subscriberData;
  } catch (error) {
    console.error("Error fetching invoice history:", error);
    throw error;
  }
}

export function useGetSubscriberInfo() {
  return useQuery({
    queryKey: ["subscriberInfo"],
    queryFn: () => getSubscriberInfo(),
  });
}
