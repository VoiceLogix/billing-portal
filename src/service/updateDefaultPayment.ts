import { axiosInstance } from "./axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const updateDefaultPayment = async (data: any) => {
  const response = await axiosInstance.put(
    "/updateProfile/defaultPayment",
    data,
  );
  console.log("updateDefaultPayment", response.data);

  return response.data;
};

export const useUpdateDefaultPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateDefaultPayment(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["profileDetails"] });

      const previousProfileDetails = queryClient.getQueryData([
        "profileDetails",
      ]);

      queryClient.setQueryData(["profileDetails"], (oldData: any) => {
        if (!oldData?.clientSubscriberInfo?.clientCCProfileInfoList)
          return oldData;

        return {
          ...oldData,
          clientSubscriberInfo: {
            ...oldData.clientSubscriberInfo,
            clientCCProfileInfoList:
              oldData.clientSubscriberInfo.clientCCProfileInfoList.map(
                (card) => ({
                  ...card,
                  default:
                    card.paymentProfileId === newData.defaultPaymentProfileId,
                }),
              ),
          },
        };
      });

      return { previousProfileDetails };
    },
    onError: (error: unknown, _variables, context) => {
      console.error("Default payment mutation error:", error);
      if (context?.previousProfileDetails) {
        queryClient.setQueryData(
          ["profileDetails"],
          context.previousProfileDetails,
        );
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profileDetails"] });
    },
  });
};
