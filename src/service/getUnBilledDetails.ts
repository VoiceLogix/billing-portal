import { UnBilledDetails } from "../types/unBilledDetailsInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getUnBilledDetails() {
  try {
    const response = await axiosInstance.get(`unBilledDetails`);
    return response.data as UnBilledDetails;
  } catch (error) {
    console.error("Error fetching unBilledDetails", error);
    throw error;
  }
}

export function useGetUnBilledDetails() {
  return useQuery({
    queryKey: ["unBilledDetails"],
    queryFn: () => getUnBilledDetails(),
  });
}
