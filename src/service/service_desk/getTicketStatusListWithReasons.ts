import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { StatusResponse } from "../../types/TicketStatusInterface";

export async function getTicketStatusListWithReasons() {
  try {
    const response = await axiosInstance.get(`/ticketStatusListWithReasons`);
    const dataResponse: StatusResponse = response.data;

    return dataResponse.statuses;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      const backendMessage = error.response.data.message;
      console.error("Backend error:", backendMessage);
      throw new Error(backendMessage);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

export function useGetTicketStatusListWithReasons() {
  return useQuery({
    queryKey: ["getTicketStatusListWithReasons"],
    queryFn: () => getTicketStatusListWithReasons(),
  });
}
