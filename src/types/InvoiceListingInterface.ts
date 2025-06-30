export interface InvoiceListingInterface {
  clientInvoiceInfoList: InvoiceInfo[];
}

export interface InvoiceInfo {
  accessDenied: boolean;
  amount: number;
  attachInvoiceWaterMark: boolean;
  billState: number;
  cardNumber: string | null;
  cardType: string | null;
  clientValidationErrorInfo: any[];
  currency: string;
  displayDueAmount: number | null;
  dueAmount: number;
  dueFlag: string;
  exportStatus: string | null;
  fileContent: string | null;
  fileName: string | null;
  formattedData: any;
  invoiceDate: number;
  invoiceDueDate: number;
  invoiceGenerationPreference: number;
  invoiceId: string | null;
  invoiceNumber: string;
  isParentPaying: string;
  locale: string | null;
  orderId: string | null;
  partyRoleId: string | null;
  payTmEnabled: boolean;
  paymentMethodEnabled: boolean;
  savedInCloud: boolean;
  status: string;
  subscriberId: string | null;
  successful: boolean;
  templateContents: string | null;
  usageExported: number;
  usageSummaryExported: number;
}

export interface PayInvoiceDetailsInterface {
  accessDenied: boolean;
  successful: boolean;
  locale: string | null;
  clientValidationErrorInfo: any[];
  clientCreditCardProfileList: any[];
  clientEcheckProfileList: any[];
  clientDigitalProfileList: any[];
  clientPaymentAttributeList: any[];
  allowInitiatedPaymentConfig: number;
  mandateDescription: string | null;
  dueAmount: string;
  orderCount: number | null;
  initiatedPaymentSuccess: boolean;
  initiated: boolean;
}
