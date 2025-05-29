export interface PaymentGateway {
  accessDenied: boolean;
  successful: boolean;
  locale: string | null;
  clientValidationErrorInfo: any[];
  paymentGatewayUrl: string;
  defaultBillingAddress: Address;
  requestParam1: string | null;
  requestParam2: string | null;
  opgAvailabel: boolean;
  customOpgUrlEnabled: boolean;
}

interface Address {
  startCount: number;
  resultCount: number;
  currentPage: number;
  itemsPerPage: number;
  totalItemPresent: number;
  resultType: string | null;
  detailCurrentPage: number;
  detailItemPerPage: number;
  totalDetailItemPresent: number;
  groupName: string | null;
  groupRefId: string | null;
  rangeFrom: string | null;
  rangeTo: string | null;
  dateRange: string | null;
  invoiceStatus: string | null;
  invoiceNotificationStatus: string | null;
  type: string | null;
  invoicePartnerFilter: string | null;
  paymentPartnerFilter: string | null;
  subscriberPartnerFilter: string | null;
  orderState: string | null;
  accountStatusList: string | null;
  locale: string | null;
  partyRoleId: string | null;
  partyHeader: string | null;
  sellerId: string | null;
  accountNumber: string | null;
  switchContactUserName: string | null;
  isSummaryExport: boolean;
  id: string;
  addLine1: string;
  addLine2: string | null;
  city: string;
  state: string;
  county: string | null;
  country: string;
  zip: string;
  zipCodeExtension: string | null;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
  lstAddressAttributes: any[] | null;
  quote: boolean;
  unpaidInvoiceList: boolean;
}
