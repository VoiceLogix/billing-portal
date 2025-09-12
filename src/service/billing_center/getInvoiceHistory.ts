import { InvoiceHistory } from "../../types/InvoiceInterface";
import { axiosInstance } from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getInvoiceHistory() {
  try {
    const response = await axiosInstance.get(`invoiceHistory`);
    return response.data as InvoiceHistory;
  } catch (error) {
    console.error("Error fetching invoice history:", error);
    throw error;
  }
}

export function useGetInvoiceHistory() {
  return useQuery({
    queryKey: ["invoiceHistory"],
    queryFn: () => getInvoiceHistory(),
  });
}
