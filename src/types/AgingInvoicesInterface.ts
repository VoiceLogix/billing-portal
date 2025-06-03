interface AgingInvoiceDetails {
  notDueYet: number;
  oneToThrityDaysDue: number;
  thirtyToSixtyDaysDue: number;
  sixtyToNinetyDaysDue: number;
  moreThanNinetyDaysDue: number;
}

export interface AgingInvoices {
  agingInvoiceDetails: AgingInvoiceDetails;
}
