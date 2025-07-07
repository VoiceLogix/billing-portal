import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

type PayInvoiceBody = {
  invoiceNumber: string;
  makePayment: boolean;
  oneTimePayment: boolean;
  paymentAmount: string;
  paymentAttributeValues: string[];
  paymentProfileId: string;
};

export async function payInvoice(data: PayInvoiceBody) {
  try {
    const response = await axiosInstance.put(`/payInvoice`, data);
    return response.data;
  } catch (error) {
    console.error("Error paying invoice:", error);
    throw error;
  }
}

export function usePayInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PayInvoiceBody) => payInvoice(data),
    onSuccess: (response) => {
      console.log("invoice paid successfully", response);

      queryClient.invalidateQueries({ queryKey: ["invoiceListing"] });
    },

    onError: (error) => {
      console.error("Error paying invoice:", error);
    },
  });
}
