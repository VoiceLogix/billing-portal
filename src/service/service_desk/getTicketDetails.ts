import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { TicketDetailsResponse } from "../../types/TicketDetailsInterface";

export async function getTicketDetails(ticketId: string) {
  try {
    const response = await axiosInstance.get(`/ticket/${ticketId}`);
    const dataResponse: TicketDetailsResponse = response.data;
    if (!dataResponse.successful) {
      throw new Error("Get ticket details failed.");
    }

    return dataResponse.clientTicket;
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

export function useGetTicketDetails(ticketId: string) {
  return useQuery({
    queryKey: ["getTicketDetails", ticketId],
    queryFn: () => getTicketDetails(ticketId),
  });
}
