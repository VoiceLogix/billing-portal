import { InvoiceInterface } from "../types/InvoiceInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getSubscriberPayments(subscriberId: string) {
  try {
    const response = await axiosInstance.get(
      `/rest/PaymentService/v1/payments?resultCount=100&accountNumber=${subscriberId}`,
    );
    return response.data as InvoiceInterface;
  } catch (error) {
    console.error("Error fetching subscriber payments:", error);
    throw error;
  }
}

export function useGetSubscriberPayments(subscriberId: string) {
  return useQuery({
    queryKey: ["payments", subscriberId],
    queryFn: () => getSubscriberPayments(subscriberId),
    enabled: !!subscriberId,
  });
}
