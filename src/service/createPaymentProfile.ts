import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { PaymentCardType } from "../components/SVG/CardTypeSVG";

interface PaymentProfileData {
  card: {
    firstName: string;
    lastName: string;
    email: string;
    cardType: PaymentCardType;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  address?: {
    addLine1: string;
    addLine2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export async function createPaymentProfile(data: PaymentProfileData) {
  try {
    const response = await axiosInstance.post(`/createPaymentProfile`, data);
    return response.data;
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

export function useCreatePaymentProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PaymentProfileData) => createPaymentProfile(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["subscriberInfo"] });
    },
  });
}

export const deletePaymentProfile = async ({
  profileId,
  subscriberId,
}: {
  profileId: string;
  subscriberId: string;
}) => {
  try {
    const response = await axiosInstance.delete(
      `/deletePaymentProfile/${subscriberId}/${profileId}`,
    );

    if (response && response.data && response.data.validationResponse) {
      const validationResponse = response.data.validationResponse;
      if (!validationResponse.successful) {
        const errorMessage = validationResponse.validationErrorInfo
          .map((error) => error.message)
          .join(", ");
        throw new Error(errorMessage || "Delete payment profile failed.");
      }
    }

    return response.data;
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
};

export function useDeletePaymentProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      profileId,
      subscriberId,
    }: {
      profileId: string;
      subscriberId: string;
    }) => deletePaymentProfile({ profileId, subscriberId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriberInfo"] });
    },
  });
}
