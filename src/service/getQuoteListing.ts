import { QuoteListingInterface } from "../types/QuoteListingInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getQuoteListing() {
  try {
    const response = await axiosInstance.get(`/quoteListing`);
    return response.data as QuoteListingInterface;
  } catch (error) {
    console.error("Error fetching quote listing:", error);
    throw error;
  }
}

export function useGetQuoteListing() {
  return useQuery({
    queryKey: ["quoteListing"],
    queryFn: () => getQuoteListing(),
  });
}
