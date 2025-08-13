import { axiosInstance } from "./axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseCreateTicket {
  onClose: () => void;
}

export const createTicket = async (data: any) => {
  // throw new Error("Not implemented yet");
  return {};
  // const response = await axiosInstance.put("/updateProfile/contact", data);
  // const errorDescription =
  //   response?.data?.clientValidationErrorInfo?.[0]?.errorDescription;
  // if (errorDescription) {
  //   console.log("errorDescription", errorDescription);
  //   throw new Error(errorDescription);
  // }
  // return response.data;
};

export const useCreateTicket = ({ onClose }: UseCreateTicket) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createTicket(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [""] });
      setTimeout(() => {
        onClose();
      }, 2000);
    },
  });
};
