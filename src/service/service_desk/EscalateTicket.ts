import { axiosInstance } from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const escalateTicket = async (data: any, ticketId: string) => {
  const response = await axiosInstance.put(`/ticket/${ticketId}`, data);

  const errorDescription =
    response?.data?.clientValidationErrorInfo?.[0]?.errorDescription;
  if (errorDescription) {
    console.log("errorDescription", errorDescription);
    throw new Error(errorDescription);
  }
  return response.data;
};

export const useEscalateTicket = ({ ticketId }: { ticketId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => escalateTicket(data, ticketId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getTicketDetails", ticketId],
      });
      await queryClient.invalidateQueries({ queryKey: ["getTickets"] });
    },
  });
};
