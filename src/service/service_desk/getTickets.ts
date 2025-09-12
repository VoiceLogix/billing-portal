import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { TicketResponse } from "../../types/TicketInterface";

export async function getTickets(data: any) {
  try {
    const response = await axiosInstance.post(`/tickets`, data);
    const dataResponse: TicketResponse = response.data;
    if (!dataResponse.successful) {
      throw new Error("Get tickets failed.");
    }

    return dataResponse.clientTickets;
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

export function useGetTickets(data: any) {
  return useQuery({
    queryKey: ["getTickets", data],
    queryFn: () => getTickets(data),
    enabled: !!data,
  });
}
