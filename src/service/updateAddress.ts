import { axiosInstance } from "./axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getSubscriberInfo } from "./getSubscriberInfo";

export const updateAddress = async (data: any) => {
  const response = await axiosInstance.put("/updateProfile/address", data);
  return response.data;
};

interface UseUpdateAddressOptions {
  onClose: () => void;
  isUpdate: boolean;
}

export const useUpdateAddress = ({
  onClose,
  isUpdate,
}: UseUpdateAddressOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateAddress(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profileDetails"] });
      toast.success(
        isUpdate
          ? "Address updated successfully"
          : "Address added successfully",
      );

      onClose();
    },
    onError: (error: unknown) => {
      console.error("Address mutation error:", error);
      toast.error(isUpdate ? "Error updating address" : "Error adding address");
    },
  });
};

export const deleteAddress = async (addressId: string) => {
  const accountNumber = (await getSubscriberInfo()).accountNumber;

  const response = await axiosInstance.delete(
    `/deleteAddress/${accountNumber}/${addressId}`,
  );
  return response.data;
};

interface UseDeleteAddressOptions {
  onClose: () => void;
}

export const useDeleteAddress = ({ onClose }: UseDeleteAddressOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => deleteAddress(data.addressId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profileDetails"] });
      toast.success("Address deleted successfully");
      onClose();
    },
    onError: (error: unknown) => {
      console.error("Address deletion error:", error);
      toast.error("Error deleting address");
    },
  });
};
