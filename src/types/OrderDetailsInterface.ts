export interface OrderDetailsInterface {
  clientOrderDetails: OrderDetails;
}

export interface OrderDetails {
  accessDenied: boolean;
  successful: boolean;
  locale: string | null;
  clientValidationErrorInfo: any[];
  orderId: string;
  orderName: string;
  orderNumber: string;
  currencySymbol: string;
  orderAmount: number;
  stateString: string;
  fulFilledDateString: string;
  totalAmountString: string;
  netAmountString: string;
  taxAmountString: string;
  surchargeAmountString: string | null;
  orderCreatedBy: string;
  clientOrderElementDetailsList: ClientOrderElementDetail[];
  isQuoteDocPresent: boolean;
  unitPrice: string;
  buyerTermsAndCondition: string | null;
  otherChargesNetAmount: string;
  otherChargesTaxAmount: string;
  otherChargesSurChargeAmount: string;
  allowQuoteToOrder: boolean;
  docusignEnabled: boolean;
  docuSignConfigured: boolean;
  showAdhocCharges: boolean;
  createdDate: string;
  sendForApproval: boolean;
}

export interface ClientOrderElementDetail {
  accessDenied: boolean;
  successful: boolean;
  locale: string | null;
  clientValidationErrorInfo: any[];
  pricePlanName: string;
  eventName: string;
  productImage: string;
  subscriptionIdentifier: string;
  bundleName: string | null;
  productName: string;
  categoryName: string;
  activationStartDate: number;
  subTotal: number;
  image: string;
  quantityString: string;
  unitPriceString: string;
}
