export interface AccountSummaryInterface {
  activeSubscriptions: number;
  openOrders: number;
  openQuotes: number;
  openInvoices: number;
  openTickets: number;
  hierarchyCount: number | null;
}
