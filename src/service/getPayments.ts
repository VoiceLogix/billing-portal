import { PaymentsInterface } from "../types/PaymentsInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function paymentPdf(receiptNumber: string) {
  try {
    const response = await axiosInstance.get(`payments/${receiptNumber}`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Payment-${receiptNumber}.pdf`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error fetching payment PDF:", error);
    throw error;
  }
}

export async function getPayments() {
  try {
    const response = await axiosInstance.get(`payments`);
    return response.data as PaymentsInterface;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
}

export function useGetPayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: () => getPayments(),
  });
}
