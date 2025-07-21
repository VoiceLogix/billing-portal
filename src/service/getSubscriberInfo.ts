import { SubscriberInfo } from "../types/SubscriberInfoInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getAccountNumber } from "./tokenStorage";

export async function getSubscriberInfo(accountId: string) {
  try {
    const response = await axiosInstance.get(`/subscriberInfo/${accountId}`);
    return response.data as SubscriberInfo;
  } catch (error) {
    console.error("[getSubscriberInfo] Error fetching subscriber info:", error);
    throw error;
  }
}

export function useGetSubscriberInfo() {
  const accountId = getAccountNumber();

  return useQuery({
    queryKey: ["subscriberInfo", accountId],
    queryFn: () => getSubscriberInfo(accountId),
  });
}
