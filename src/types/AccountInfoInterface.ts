import { PayInfoItem } from "./SubscriberInfoInterface";

export interface AccountInfo {
  locale: string | null;
  accountBalance: string;
  currentDue: string;
  lastPaymentAmount: number;
  lastPaymentDate: number;
  credit: any | null;
  billedBalance: number;
  unBilledBalance: number;
  clientSubscriptionInfo: any | null;
  parentPaying: boolean;
}
