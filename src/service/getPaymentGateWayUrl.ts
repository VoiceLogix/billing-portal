import { PaymentGateway } from "../types/PaymentGateWayInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getPaymentGateWayUrl(accountNumber: string) {
  try {
    const response = await axiosInstance.get(
      `/paymentGateWayUrl/${accountNumber}`,
    );
    return response?.data as PaymentGateway;
  } catch (error) {
    console.error("Error fetching paymentGateWayUrl:", error);
    throw error;
  }
}

export function useGetPaymentGateWayUrl(accountNumber: string) {
  return useQuery({
    queryKey: ["paymentGatewayUrl"],
    queryFn: () => getPaymentGateWayUrl(accountNumber),
  });
}
