import { StateInfo } from "../types/StateInfoInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getStateInfo(countryId: string) {
  try {
    const response = await axiosInstance.get(`stateInfo/${countryId}`);
    return response?.data as StateInfo;
  } catch (error) {
    console.error("Error fetching stateInfo:", error);
    throw error;
  }
}

export function useGetStateInfo(countryId: string | null) {
  return useQuery({
    queryKey: ["stateInfo", countryId],
    queryFn: () => getStateInfo(countryId),
    enabled: !!countryId,
  });
}
