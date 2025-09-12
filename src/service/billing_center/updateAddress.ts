import { axiosInstance } from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccountNumber } from "./tokenStorage";

export const updateAddress = async (data: any) => {
  const response = await axiosInstance.put("/updateProfile/address", data);
  const errorDescription =
    response?.data?.clientValidationErrorInfo?.[0]?.errorDescription;
  if (errorDescription) {
    console.log("errorDescription", errorDescription);
    throw new Error(errorDescription);
  }
  return response.data;
};

export const useUpdateAddress = (handleClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateAddress(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profileDetails"] });
      setTimeout(() => {
        handleClose();
      }, 2000);
    },
    onError: (error: unknown) => {
      console.error("Address mutation error:", error);
    },
  });
};

export const deleteAddress = async (addressId: string) => {
  const accountNumber = getAccountNumber();

  const response = await axiosInstance.delete(
    `/deleteAddress/${accountNumber}/${addressId}`,
  );
  const responseStatus = response?.data?.status === "OK";

  const errorDescription =
    response?.data?.validationResponse?.validationErrorInfo?.[0]?.message;

  if (errorDescription || !responseStatus) {
    throw new Error(
      errorDescription || "Error deleting address, please try again",
    );
  }
  return response.data;
};

export const useDeleteAddress = (handleClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string) => deleteAddress(addressId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profileDetails"] });
      setTimeout(() => {
        handleClose();
      }, 2000);
    },
    onError: (error: unknown) => {
      console.error("Address deletion error:", error);
    },
  });
};
