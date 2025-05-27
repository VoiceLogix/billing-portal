import { InvoiceInterface } from "../types/InvoiceInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getSubscriberInvoices(subscriberId: string) {
  try {
    const response = await axiosInstance.get(
      `/rest/SubscriberService/v1/subscribers/${subscriberId}/invoices`,
    );
    return response.data as InvoiceInterface;
  } catch (error) {
    console.error("Error fetching subscriber invoice:", error);
    throw error;
  }
}

export function useGetSubscriberInvoices(subscriberId: string) {
  return useQuery({
    queryKey: ["invoice", subscriberId],
    queryFn: () => getSubscriberInvoices(subscriberId),
    enabled: !!subscriberId,
  });
}
