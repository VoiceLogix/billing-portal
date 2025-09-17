import { axiosInstance } from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createTicket = async (data: any) => {
  const response = await axiosInstance.post("/createTicket", data);
  const errorDescription =
    response?.data?.clientValidationErrorInfo?.[0]?.errorDescription;
  if (errorDescription) {
    console.log("errorDescription", errorDescription);
    throw new Error(errorDescription);
  }
  return response.data;
};

export const useEditProperties = ({ ticketId }: { ticketId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createTicket(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getTicketDetails", ticketId],
      });
      await queryClient.invalidateQueries({ queryKey: ["getTickets"] });
    },
  });
};
