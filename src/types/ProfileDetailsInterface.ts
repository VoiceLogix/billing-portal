export interface Address {
  id: string;
  addLine1: string | null;
  addLine2: string | null;
  city: string | null;
  state: string | null;
  county: string | null;
  country: string | null;
  zip: string | null;
  zipCodeExtension: string | null;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
  lstAddressAttributes: any[];
  quote: boolean;
  unpaidInvoiceList: boolean;
}

export interface ClientCommunicationDTO {
  id: string;
  contactId: string | null;
  value: string | null;
  type: string;
}

export interface ClientCustomerContact {
  id: string;
  salutation: string | null;
  firstName: string;
  lastName: string;
  contactType: string | null;
  userName: string;
  emailId: string;
  faceBookUserName: string | null;
  type: number;
  locale: string;
  clientCommunicationDTOList: ClientCommunicationDTO[];
  alternateContactNumber: string | null;
  cellContactNumber: string | null;
  contactNumber: string | null;
  designation: string;
  userId: string;
  userRole: string;
  groupsType: string;
  primaryContact: boolean;
  billingContact: boolean;
  lstContactAttributes: any[];
}

export interface ClientCountryDTO {
  countryCode: string;
  countryName: string;
  id: string;
  isoAlpha3: string;
}

export interface ProfileDetails {
  clientSubscriberInfo: ClientSubscriberInfo;
  clientCountryDTOList: ClientCountryDTO[];
}

export interface ClientSubscriberInfo {
  accessDenied: boolean;
  successful: boolean;
  locale: string | null;
  clientValidationErrorInfo: any[];
  partyId: string;
  id: string | null;
  sellerId: string | null;
  accountNumber: string;
  name: string;
  partyRoleId: string;
  primaryCurrencyId: string | null;
  firstName: string | null;
  lastName: string | null;
  emailId: string | null;
  contactNumber: string | null;
  password: string | null;
  confirmPassword: string | null;
  userName: string | null;
  userId: string | null;
  currencySymbol: string | null;
  accountCreatedDate: number | null;
  credit: number | null;
  csrfToken: string | null;
  contactType: string | null;
  cellContactNumber: string | null;
  alternateContactNumber: string | null;
  designation: string | null;
  parentSponsored: string | null;
  parentAccountNumber: string | null;
  accountingDisplayName: string;
  activationStartDate: number;
  paymentDueInterval: number;
  billCycleStartDate: number;
  billCycleEndDate: number;
  accountId: string;
  partyType: number;
  partyTypeString: string;
  partyRoleTypeString: string | null;
  accImageByteStringURL: string | null;
  lstAddresses: Address[];
  clientCustomerContactDTO: ClientCustomerContact;
  clientCustomerContacts: ClientCustomerContact[];
  accountType: string | null;
  billingDom: number;
  accountStatus: string | null;
  billingType: string | null;
}
