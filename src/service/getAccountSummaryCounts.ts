import { AccountSummaryInterface } from "../types/AccountSummaryInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getAccountSummaryCounts() {
  try {
    const response = await axiosInstance.get(`accountSummaryCounts`);
    return response.data as AccountSummaryInterface;
  } catch (error) {
    console.error("Error fetching accountSummaryCounts", error);
    throw error;
  }
}

export function useGetAccountSummaryCounts() {
  return useQuery({
    queryKey: ["accountSummaryCounts"],
    queryFn: () => getAccountSummaryCounts(),
  });
}
