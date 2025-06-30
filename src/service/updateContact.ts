import { axiosInstance } from "./axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getSubscriberInfo } from "./getSubscriberInfo";

export const updateContact = async (data: any) => {
  const response = await axiosInstance.put("/updateProfile/contact", data);
  return response.data;
};

export const useUpdateContact = ({
  onClose,
  isUpdate,
}: UseUpdateContactOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateContact(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profileDetails"] });
      onClose();
      toast.success(
        isUpdate
          ? "Contact updated successfully"
          : "Contact added successfully",
      );
    },
    onError: (error: unknown) => {
      console.error("Contact mutation error:", error);
      toast.error(isUpdate ? "Error updating contact" : "Error adding contact");
    },
  });
};

interface UseUpdateContactOptions {
  onClose: () => void;
  isUpdate: boolean;
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
      onClose();
      toast.success("Contact deleted successfully");
    },
    onError: (error: unknown) => {
      console.error("Contact deletion error:", error);
      toast.error("Error deleting contact");
    },
  });
};
