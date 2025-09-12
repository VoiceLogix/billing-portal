import { AttachmentFile } from "../../components/ServiceDesk/types";
import { axiosInstance } from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseCreateTicket {
  onClose: () => void;
}

interface CreateTicketPayload {
  clientTicket: {
    subject: string;
    description: string;
    priority: number | string;
    classificationId: string | number;
    userId: string | number;
    attachments: AttachmentFile[];
    addressId?: string | number;
    emailInfo: {
      ccAddressList: string[];
      bccAddressList: string[];
    };
  };
}

export const createTicket = async (data: CreateTicketPayload) => {
  const response = await axiosInstance.post("/createTicket", data);
  const errorDescription =
    response?.data?.clientValidationErrorInfo?.[0]?.errorDescription;
  if (errorDescription) {
    console.log("errorDescription", errorDescription);
    throw new Error(errorDescription);
  }
  console.log("Create ticket response:", response.data);

  return response.data;
};

export const useCreateTicket = ({ onClose }: UseCreateTicket) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createTicket(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getTickets"] });
      setTimeout(() => {
        onClose();
      }, 2000);
    },
  });
};
