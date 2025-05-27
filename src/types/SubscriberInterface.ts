export interface CommunicationPoint {
  type: string; // e.g., "EMAIL"
  value: string;
}

export interface UserDetail {
  id: string;
  username: string;
  password: string;
  userRoleName: string;
  userStatus: number;
  is2faEnabled: boolean;
  isResetSecretKey: boolean;
  isSecretKeyPresent: boolean;
}

export interface Contact {
  id: string;
  contactType: number;
  firstName: string;
  lastName: string;
  communicationPoint: CommunicationPoint[];
  userDetail: UserDetail;
  primaryContact: boolean;
  billingContact: boolean;
  locale: string;
  registered: boolean;
}

export interface Address {
  id: string;
  addLine1: string;
  addLine2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  defaultShipping: boolean;
  defaultBilling: boolean;
  isSkipTax: boolean;
}

export interface BillInfo {
  billinfoId: string;
  billingFrequency: number;
  billingDayOfMonth: number;
  billFrequencyUnit: string;
  status: string;
}

export interface InvoiceInfo {
  invoiceProfileId: string;
}

export interface WalletBalance {
  refType: string; // "Payment" | "Credit" | "Adjustment"
  balance: number;
}

export interface AccountBalance {
  billedAmount: number;
  unBilledAmount: number;
  totalAmount: number;
}

export interface SubscriberInterface {
  accountName: string;
  accountNumber: string;
  accountId: string;
  id: string;
  createdDate: string;
  accountStatus: string;
  accountType: string;
  primaryCurrencyId: string;
  secondaryCurrencyId: string;
  currencySymbol: string;
  address: Address[];
  contact: Contact[];
  billInfo: BillInfo[];
  invoiceInfo: InvoiceInfo[];
  subscriberId: string;
  payingEntity: number;
  activationStartDate: string;
  invoiceFormat: number;
  billingCycleDuration: string;
  exemptLateFee: boolean;
  accountBalance: AccountBalance;
  isHierarchyPresent: boolean;
  accountingDisplayName: string;
  createBGPerOrder: boolean;
  invoiceDeliveryPreference: string;
  isAgent: boolean;
  walletBalance: WalletBalance[];
  isSkipTax: boolean;
  adjustmentGenerationMethod: string;
  enforcePaymentProfile: number;
  hasBundleSubscriptions: boolean;
  billingType: number;
  minimumCommitmentCharge: number;
  partyRoleId: string;
  sellerPartyRoleId: string;
  dueCollectionDate: string;
  status: string;
}
