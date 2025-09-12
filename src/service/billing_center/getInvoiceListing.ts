import {
  InvoiceListingInterface,
  PayInvoiceDetailsInterface,
} from "../../types/InvoiceListingInterface";
import { axiosInstance } from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getInvoiceDetails(invoiceId: string) {
  try {
    const response = await axiosInstance.get(`invoiceListing/${invoiceId}`);
    if (response.data) {
      const url = response.data.invoiceViewHtml;
      window.open(
        url,
        "InvoiceWindow",
        "menubar=no,toolbar=no,location=no,status=no",
      );
    }
  } catch (error) {
    console.error("Error fetching invoice details:", error);
    throw error;
  }
}

export async function getPayInvoiceDetails(invoiceId: string) {
  try {
    const response = await axiosInstance.get(`invoicePayDetails/${invoiceId}`);
    return response.data as PayInvoiceDetailsInterface;
  } catch (error) {
    console.error("Error fetching invoice details:", error);
    throw error;
  }
}

export function useGetPayInvoiceDetails(invoiceId: string) {
  return useQuery({
    queryKey: ["invoicePayDetails", invoiceId],
    queryFn: () => getPayInvoiceDetails(invoiceId),
  });
}

export async function getInvoiceListing() {
  try {
    const response = await axiosInstance.get(`invoiceListing`);
    return response.data as InvoiceListingInterface;
  } catch (error) {
    console.error("Error fetching quote listing:", error);
    throw error;
  }
}

export function useGetInvoiceListing() {
  return useQuery({
    queryKey: ["invoiceListing"],
    queryFn: () => getInvoiceListing(),
  });
}
