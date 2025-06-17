export interface QuoteListingInterface {
  clientOrderInfoList: ClientOrderInfo[];
}

export interface ClientOrderInfo {
  accessDenied: boolean;
  successful: boolean;
  locale: string | null;
  clientValidationErrorInfo: any[];
  orderId: string;
  orderName: string;
  orderNumber: string;
  createdDate: number; // Epoch milliseconds
  itemCount: number;
  currencySymbol: string;
  orderAmount: number;
  fulFilledDate: number;
  taxAmount: number;
  orderAttributesMap: Record<string, unknown>;
  otherCharges: number;
  otherChargesTax: number;
  stateString: string;
  fulFilledDateString: string | null;
  endUserName: string | null;
  orderStatus: string;
}
