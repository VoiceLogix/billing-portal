import { AttachmentFile } from "../../components/ServiceDesk/types";
import { axiosInstance } from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseUpdateTicket {
  ticketId: string;
}
interface UpdateTicketPayload {
  clientTicket: {
    conversations: Conversation[];
  };
}

interface Conversation {
  conversation: string;
  attachments: AttachmentFile[];
}

export const updateTicket = async (
  data: UpdateTicketPayload,
  ticketId: string,
) => {
  const response = await axiosInstance.put(`/ticket/${ticketId}`, data);
  const errorDescription =
    response?.data?.clientValidationErrorInfo?.[0]?.errorDescription;
  if (errorDescription) {
    console.log("errorDescription", errorDescription);
    throw new Error(errorDescription);
  }
  console.log("Create ticket response:", response.data);

  return response.data;
};

export const useUpdateTicket = ({ ticketId }: UseUpdateTicket) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateTicket(data, ticketId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getTicketDetails", ticketId],
      });
    },
  });
};
