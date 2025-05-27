export interface PaymentResponse {
  resultSize: number;
  payment: Payment[];
  status: string;
}

export interface Payment {
  invoiceNumber: string;
  amount: number;
  receiptNumber: string;
  paymentMethod: string;
  paymentDate: string; // ISO 8601 format
  accountNumber: string;
  id: string;
  balance: number;
  paymentStatus: string;
  isARRevamp: boolean;
  isRefund: boolean;
  createdDate: string; // ISO 8601 format
  currency: string;
  paymentGateway: string;
}
