import { InvoiceInterface } from "../types/InvoiceInterface";
import { PaymentResponse } from "../types/PaymentInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getSubscriberPayments(subscriberId: string) {
  try {
    const response = await axiosInstance.get(
      `/rest/PaymentService/v1/payments?resultCount=1000&accountNumber=${subscriberId}`,
    );
    const paymentResponse = response.data as PaymentResponse;
    return paymentResponse.payment.filter(
      (payment) => (payment.accountNumber = subscriberId),
    );
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
