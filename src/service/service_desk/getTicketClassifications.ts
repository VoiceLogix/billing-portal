import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { TicketClassificationResponse } from "../../types/TicketClassificationsInterface";

export async function getTicketClassifications() {
  try {
    const response = await axiosInstance.get(`/ticketClassifications`);
    const dataResponse: TicketClassificationResponse = response.data;
    if (!dataResponse.successful) {
      throw new Error("Get ticket classifications failed.");
    }

    return dataResponse.ticketClassificationList;
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

export function useGetTicketClassifications() {
  return useQuery({
    queryKey: ["getTicketClassifications"],
    queryFn: () => getTicketClassifications(),
  });
}
