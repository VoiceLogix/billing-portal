// Address attribute
interface AddressAttributeValue {
  value: string;
  sequence: number;
}
interface AddressAttribute {
  id: string;
  key: string;
  value: string;
  sequence: number;
  aggregator: number;
  visiblity: number;
  multipleEntriesConfig: string;
  attributeValuesInfo: {
    associateValues: AddressAttributeValue[];
  };
}

// Address
export interface Address {
  id: string;
  addLine1: string;
  addLine2?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  defaultShipping?: boolean;
  defaultBilling?: boolean;
  addressAttribute?: AddressAttribute[];
  isSkipTax?: boolean;
}

// Communication points for contacts
interface CommunicationPoint {
  type: string; // e.g., "PHONE", "EMAIL"
  value: string;
}

// Contact
interface Contact {
  id: string;
  contactType: number;
  firstName: string;
  lastName: string;
  communicationPoint: CommunicationPoint[];
  primaryContact: boolean;
  billingContact: boolean;
  locale: string;
  designation: string;
  registered: boolean;
}

// Bill info
interface BillInfo {
  billinfoId: string;
  billingFrequency: number;
  billingDayOfMonth: number;
  billFrequencyUnit: string;
  status: string;
}

// Credit card info in payInfo
interface CreditCardInfo {
  cardNumber: string;
  cardType: string;
  cardExpiryMonth: number;
  cardExpiryYear: number;
  firstName: string;
  lastName: string;
}

// E-check info in payInfo
interface ECheckInfo {
  accountHolderName: string;
  bankAccountNumber: string;
  bankAccountType: "Checking" | "Savings";
  bankName: string;
  routingNumber: string;
}

// Profile address in payInfo
interface ProfileAddress {
  addLine1: string;
  addLine2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

// Pay info item
export interface PayInfoItem {
  paymentProfileId: string;
  referenceKey: string;
  paymentMethod: string; // "CC" or "ECHECK"
  creditCardInfo?: CreditCardInfo;
  echeckInfo?: ECheckInfo;
  profileAddress: ProfileAddress;
  isDefault: boolean;
  status?: string;
}

// Invoice info
interface InvoiceInfo {
  invoiceProfileId: string;
}

// Tax exemption
interface TaxExemptionCode {
  code: {
    code: string;
    description: string;
  }[];
}

// Account balance
interface AccountBalance {
  billedAmount: number;
  unBilledAmount: number;
  totalAmount: number;
}

// Contract
interface Contract {
  contractCode: string;
  contractName: string;
  contractStatus: number;
}

// Wallet balance
interface WalletBalance {
  refType: string; // "Payment", "Credit", etc.
  balance: number;
}

// === Main Interface ===
export interface SubscriberInfo {
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
  payInfo: PayInfoItem[];
  invoiceInfo: InvoiceInfo[];
  taxExemptionCode: TaxExemptionCode;
  subscriberId: string;
  payingEntity: number;
  activationStartDate: string;
  isGenerateInvoiceForSponsoredAccounts: boolean;
  invoiceFormat: number;
  billingCycleDuration: string;
  exemptLateFee: boolean;
  accountBalance: AccountBalance;
  externalId: string;
  isHierarchyPresent: boolean;
  accountingDisplayName: string;
  createBGPerOrder: boolean;
  invoiceDeliveryPreference: string;
  isAgent: boolean;
  contract: Contract;
  walletBalance: WalletBalance[];
  accountOwnerId: string;
  isSkipTax: boolean;
  adjustmentGenerationMethod: string;
  enforcePaymentProfile: number;
  hasBundleSubscriptions: boolean;
  billingType: number;
  minimumCommitmentCharge: number;
  partyRoleId: string;
  sellerPartyRoleId: string;
  status: string; // "OK"
}
