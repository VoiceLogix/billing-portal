export interface InvoiceAmount {
  billAmount: string;
  dueAmount: string;
  paidAmount: string;
  finalizedDate: string; // ISO date string
}

export interface InvoiceHistory {
  invoiceAmounts: InvoiceAmount[];
}
