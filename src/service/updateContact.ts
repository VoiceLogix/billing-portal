import { axiosInstance } from "./axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSubscriberInfo } from "./getSubscriberInfo";

export const updateContact = async (data: any) => {
  const response = await axiosInstance.put("/updateProfile/contact", data);
  return response.data;
};

export const useUpdateContact = ({ onClose }: UseUpdateContactOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateContact(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profileDetails"] });
      setTimeout(() => {
        onClose();
      }, 2000);
    },
    onError: (error: unknown) => {
      console.error("Contact mutation error:", error);
    },
  });
};

interface UseUpdateContactOptions {
  onClose: () => void;
}

export const deleteContact = async (contactId: string) => {
  const accountNumber = (await getSubscriberInfo()).accountNumber;

  const response = await axiosInstance.delete(
    `/deleteContact/${accountNumber}/${contactId}`,
  );
  return response.data;
};

interface UseDeleteContactOptions {
  onClose: () => void;
}

export const useDeleteContact = ({ onClose }: UseDeleteContactOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => deleteContact(data.contactId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profileDetails"] });
      setTimeout(() => {
        onClose();
      }, 2000);
    },
    onError: (error: unknown) => {
      console.error("Contact deletion error:", error);
    },
  });
};
