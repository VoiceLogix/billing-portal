export interface InvoiceItem {
  invoiceNumber: string;
  currency: string;
  accountNumber: string;
  dueDate: string; // ISO date string
  invoiceDate: string; // ISO date string
  amount: number;
  status: "Due" | "Paid" | string; // add other statuses if needed
  dueAmount: number;
  billNumber: string;
  invoiceGenerationPreference: number;
}

export interface InvoiceInterface {
  totalDueAmount: number;
  invoice: InvoiceItem[];
  resultSize: number;
  status: string; // e.g., "OK"
}
