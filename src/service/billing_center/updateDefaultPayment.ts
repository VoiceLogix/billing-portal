import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import {
  PayInfoItem,
  SubscriberInfo,
} from "../../types/SubscriberInfoInterface";
import { getAccountNumber } from "./tokenStorage";

export const updateDefaultPayment = async (data: {
  defaultPaymentProfileId: string;
}) => {
  const response = await axiosInstance.put(
    "/updateProfile/defaultPayment",
    data,
  );
  return response.data;
};

export const useUpdateDefaultPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { defaultPaymentProfileId: string }) =>
      updateDefaultPayment(data),

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["subscriberInfo"] });

      const previousSubscriberInfo = queryClient.getQueryData<SubscriberInfo>([
        "subscriberInfo",
      ]);

      const accountId = getAccountNumber();

      queryClient.setQueryData<SubscriberInfo>(
        ["subscriberInfo", accountId],
        (oldData) => {
          if (!oldData) return oldData;

          const updatedPayInfo: PayInfoItem[] = oldData.payInfo.map((item) => ({
            ...item,
            isDefault:
              item.paymentProfileId === newData.defaultPaymentProfileId,
          }));

          return {
            ...oldData,
            payInfo: updatedPayInfo,
          };
        },
      );

      return { previousSubscriberInfo };
    },

    onError: (error, _variables, context) => {
      console.error("Default payment mutation error:", error);
      if (context?.previousSubscriberInfo) {
        queryClient.setQueryData(
          ["subscriberInfo"],
          context.previousSubscriberInfo,
        );
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["subscriberInfo"] });
    },
  });
};
