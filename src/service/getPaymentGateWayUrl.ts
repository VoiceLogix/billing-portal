import { PaymentGateway } from "../types/PaymentGateWayInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_SUBSCRIBER_ID } from "./tokenStorage";

export async function getPaymentGateWayUrl() {
  try {
    const response = await axiosInstance.get(
      `/paymentGateWayUrl/${DEFAULT_SUBSCRIBER_ID}`,
    );
    return response?.data as PaymentGateway;
  } catch (error) {
    console.error("Error fetching paymentGateWayUrl:", error);
    throw error;
  }
}

export function useGetPaymentGateWayUrl() {
  return useQuery({
    queryKey: ["paymentGatewayUrl"],
    queryFn: () => getPaymentGateWayUrl(),
  });
}
