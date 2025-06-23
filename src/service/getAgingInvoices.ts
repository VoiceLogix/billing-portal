import { AgingInvoices } from "../types/AgingInvoicesInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getAgingInvoices() {
  try {
    const response = await axiosInstance.get(`agingInvoices`);
    return response.data as AgingInvoices;
  } catch (error) {
    console.error("Error fetching aging invoices:", error);
    throw error;
  }
}

export function useGetAgingInvoices() {
  return useQuery({
    queryKey: ["agingInvoices"],
    queryFn: () => getAgingInvoices(),
  });
}
