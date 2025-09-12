import { QuoteListingInterface } from "../../types/QuoteListingInterface";
import { axiosInstance } from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getQuoteListing(type: string) {
  try {
    const response = await axiosInstance.get(`${type.toLowerCase()}Listing`);
    return response.data as QuoteListingInterface;
  } catch (error) {
    console.error("Error fetching quote listing:", error);
    throw error;
  }
}

export function useGetBillingListing(type: string) {
  return useQuery({
    queryKey: ["billingListing", type],
    queryFn: () => getQuoteListing(type),
  });
}
