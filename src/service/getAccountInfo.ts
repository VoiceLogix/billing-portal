import { AccountInfo } from "../types/AccountInfoInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getAccountInfo() {
  try {
    const response = await axiosInstance.get(`accountInfo`);
    return response.data as AccountInfo;
  } catch (error) {
    console.error("Error fetching accountInfo:", error);
    throw error;
  }
}

export function useGetAccountInfo() {
  return useQuery({
    queryKey: ["accountInfo"],
    queryFn: () => getAccountInfo(),
  });
}
