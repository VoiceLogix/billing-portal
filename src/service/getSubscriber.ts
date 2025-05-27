import { SubscriberInterface } from "../types/SubscriberInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getSubscriber(subscriberId: string) {
  try {
    const response = await axiosInstance.get(
      `/rest/SubscriberService/v1/subscribers/${subscriberId}`,
    );
    return response.data as SubscriberInterface;
  } catch (error) {
    console.error("Error fetching subscriber:", error);
    throw error;
  }
}

export function useGetSubscriber(subscriberId: string) {
  return useQuery({
    queryKey: ["subscriber", subscriberId],
    queryFn: () => getSubscriber(subscriberId),
  });
}
