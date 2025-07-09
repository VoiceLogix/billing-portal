export interface SubscriptionResponse {
  subscriptionInstance: SubscriptionInstance[];
  showBundlePricePlan: boolean;
  totalSubscriptionsCount: number;
  isSubscriptionAvailable: boolean;
  accessDenied: boolean;
  successful: boolean;
  clientValidationErrorInfo: any[];
}

export interface SubscriptionInstance {
  accountId: string;
  identifier: string;
  activationStartDate: string;
  status: string;
  quantity: string;
  productName: string;
  pricePlanName: string;
  term: string;
  termAction: string;
  termEndDate: string;
  remainingTerm: number;
  chargeFrom: string;
  chargeTo: string;
  serviceAddress: string;
  noOfAddOns: number;
  orderCreatedDate: string;
  orderNumber: string;
  instanceId: string;
  subsListingId: string;
  subsOfferId: string;
  mrcListPrice: string;
  mrcDiscount: string;
  mrcUnitPrice: string;
  mrcExtPrice: string;
  nrcListPrice: string;
  nrcDiscount: string;
  nrcUnitPrice: string;
  nrcExtPrice: string;
  isBundled: boolean;
  productCode: string;
  pricePlanCode: string;
  referenceId: string;
  isNonOneTimeChargesPresent: boolean;
  currencySymbol: string;
  serviceAddressId: string;
  accessDenied: boolean;
  successful: boolean;
  clientValidationErrorInfo: any[];
  details?: SubscriptionInfo;
}

export interface ChargeDetail {
  grossAmount: number;
  discountAmount: number;
  netAmount: number;
  taxAmount: number;
  couponDiscount: number;
  surchargeAmount: number;
  surchargeTaxAmount: number;
  eventType: string;
  unitGrossAmount: number;
  invoiceDescription: string;
  eventName: string;
  chargeMode: number;
  priceplanEventId: string;
  quantity: number;
}

export interface SubscriptionInfo {
  productName: string;
  priceplanName: string;
  identifier: string;
  productImage: string | null;
  quantity: string;
  status: number;
  chargingFrequency: string;
  amount: number;
  lastChargeDate: number;
  nextChargeDate: number;
  expirationDate: number;
  activationStartDate: number;
  clientSubscriptionAttributesList: any[];
  statusString: string;
  currencySymbol: string;
  productId: string;
  addOnSubscriptionOffers: any[];
  addOnLink: string;
  unitPrice: number;
  image: string;
  subsOfferDeviceList: any[];
  clientChargeDetails: ChargeDetail[];
  pricePlanId: string;
  subsOfferId: string;
  usagePresent: boolean;
  markup: boolean;
}

export interface SubscriptionDetailsResponse {
  accessDenied: boolean;
  successful: boolean;
  clientValidationErrorInfo: any[];
  clientViewSubscriptionInfo: SubscriptionInfo;
}
