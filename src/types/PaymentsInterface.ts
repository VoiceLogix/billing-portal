export interface PaymentsInterface {
  clientPaymentInfo: PaymentInfo[];
}

export interface PaymentInfo {
  paymentDate: number; // Unix timestamp in milliseconds
  receiptNumber: string;
  paymentType: "CHECK" | string; // Add other types if applicable
  paymentAmount: string; // Can be changed to number if preferred
  accountId: string;
  currencySymbol: string;
  paymentSourceType: "PAYMENT" | string; // Add other source types if needed
  downloadReceiptLabel: string | null;
  paymentStatus: "Success" | "Failed" | string; // Expand as necessary
  paymentFee: string | null; // Assumed to be string if consistent with amount
}
