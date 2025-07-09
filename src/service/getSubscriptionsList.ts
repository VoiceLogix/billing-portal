import {
  SubscriptionDetailsResponse,
  SubscriptionResponse,
} from "../types/SubscriptionInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getSubscriptionsDetail(subscriptionsId: string) {
  try {
    const response = await axiosInstance.get(
      `getSubscription/${subscriptionsId}`,
    );
    return response?.data as SubscriptionDetailsResponse;
  } catch (error) {
    console.error("Error fetching stateInfo:", error);
    throw error;
  }
}

export async function getSubscriptionsList(data) {
  try {
    const response = await axiosInstance.post(`subscriptionsList`, data);
    const subscriptionsList = response?.data as SubscriptionResponse;
    const subscriptionsListWithDetails = await Promise.all(
      subscriptionsList?.subscriptionInstance.map(async (subscription) => {
        const subscriptionDetails = await getSubscriptionsDetail(
          subscription.instanceId,
        );
        return {
          ...subscription,
          details: subscriptionDetails.clientViewSubscriptionInfo,
        };
      }),
    );
    return {
      ...subscriptionsList,
      subscriptionInstance: subscriptionsListWithDetails,
    };
  } catch (error) {
    console.error("Error fetching stateInfo:", error);
    throw error;
  }
}

export function useGetSubscriptionsList(data) {
  return useQuery({
    queryKey: ["getSubscriptionsList", data],
    queryFn: () => getSubscriptionsList(data),
    enabled: !!data,
  });
}
