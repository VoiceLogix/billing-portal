export interface BillingSubscriberResult {
  accountNumber: string | null;
  address: Address[] | null;
  contact: Contact[] | null;
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

export interface BillingAuthResponse {
  jsessionId: string;
  csrfToken: string;
  subscriberData: BillingSubscriberResult;
}
