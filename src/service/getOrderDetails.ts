import { OrderDetailsInterface } from "../types/OrderDetailsInterface";
import { axiosInstance } from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export async function getOrderDetails(id: string) {
  try {
    const response = await axiosInstance.get(`/orderdetails/${id}`);
    return response.data as OrderDetailsInterface;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
}

export function useGetOrderDetails(id: string) {
  return useQuery({
    queryKey: ["orderDetails."],
    queryFn: () => getOrderDetails(id),
  });
}
