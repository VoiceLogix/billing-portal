import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getOneBillSubscriber(subscriberId: string = "SR2002") {
  try {
    const response = await axiosInstance.get(
      `/rest/SubscriberService/v1/subscribers/${subscriberId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching subscriber:", error);
    throw error;
  }
}

export function useOneBillSubscriber(subscriberId: string = "SR2002") {
  return useQuery({
    queryKey: ["subscriber", subscriberId],
    queryFn: () => getOneBillSubscriber(subscriberId),
  });
}
