import { ProfileDetails } from "../types/ProfileDetailsInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getProfileDetails() {
  try {
    const response = await axiosInstance.get(`profileDetails`);
    return response?.data as ProfileDetails;
  } catch (error) {
    console.error("Error fetching profileDetails:", error);
    throw error;
  }
}

export function useGetProfileDetails() {
  return useQuery({
    queryKey: ["profileDetails"],
    queryFn: () => getProfileDetails(),
  });
}
