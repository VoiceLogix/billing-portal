import { PaymentGateway } from "../types/PaymentGateWayInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getPaymentGateWayUrl(referenceKey: string) {
  try {
    const response = await axiosInstance.get(
      `/paymentGateWayUrl/${referenceKey}`,
    );
    return response?.data as PaymentGateway;
  } catch (error) {
    console.error("Error fetching paymentGateWayUrl:", error);
    throw error;
  }
}

export function useGetPaymentGateWayUrl(referenceKey: string) {
  return useQuery({
    queryKey: ["paymentGatewayUrl", referenceKey],
    queryFn: () => getPaymentGateWayUrl(referenceKey),
  });
}
