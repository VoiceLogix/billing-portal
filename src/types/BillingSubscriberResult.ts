export interface BillingSubscriberResult {
  accountNumber: string | null;
  address: Address[] | null;
  contact: Contact[] | null;
  payInfo: PayInfo[] | null;
}

export type Address = {
  id: string;
  addLine1: string;
  addLine2: string;
  county: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  defaultShipping: boolean;
  defaultBilling: boolean;
  isSkipTax: boolean;
};

export type Contact = {
  id: string;
  contactType: number;
  firstName: string;
  lastName: string;
  communicationPoint: CommunicationPoint[];
  primaryContact: boolean;
  billingContact: boolean;
  locale: string;
  designation?: string;
  registered: boolean;
};

export type CommunicationPoint = {
  type: "PHONE" | "EMAIL" | "APHONE" | "CPHONE";
  value: string;
};

export type PayInfo = {
  paymentProfileId: string;
  referenceKey: string;
  paymentMethod: string;
  creditCardInfo: CreditCardInfo;
  profileAddress: ProfileAddress;
  isDefault: boolean;
  status: string;
};

export type CreditCardInfo = {
  cardNumber: string;
  cardType: string;
  cardExpiryMonth: number;
  cardExpiryYear: number;
  firstName: string;
  lastName: string;
};

export type ProfileAddress = {
  addLine1: string;
  addLine2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export interface BillingAuthResponse {
  jsessionId: string;
  csrfToken: string;
  subscriberData: BillingSubscriberResult;
}
