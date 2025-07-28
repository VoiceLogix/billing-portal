import { CurrentBalance } from "./CurrentBalance";
import { Box } from "../UI/Box";
import { DueAmount } from "./DueAmount";
import { BillingCycle } from "./BillingCycle";
import { AccountNumber } from "./AccountNumber";
import { useGetAccountInfo } from "../../service/getAccountInfo";
import { useGetInvoiceHistory } from "../../service/getInvoiceHistory";
import { useGetAgingInvoices } from "../../service/getAgingInvoices";
import { Loading } from "../UI/Loading";
import { Error } from "../UI/Error";
import { PaymentCardPreview } from "../UI/PaymentMethod/PaymentCardPreview";
import { InvoiceAndPayment } from "./InvoiceAndPayment";
import { useGetSubscriberInfo } from "../../service/getSubscriberInfo";

export const Dashboard = () => {
  const {
    data: accountInfo,
    isLoading: accountInfoLoading,
    isError: accountInfoError,
  } = useGetAccountInfo();
  const {
    data: invoiceHistory,
    isLoading: invoiceHistoryLoading,
    isError: invoiceHistoryError,
  } = useGetInvoiceHistory();
  const {
    data: agingInvoices,
    isLoading: agingInvoicesLoading,
    isError: agingInvoicesError,
  } = useGetAgingInvoices();
  const {
    data: subscriberInfo,
    isLoading: subscriberInfoLoading,
    isError: subscriberInfoError,
  } = useGetSubscriberInfo();

  const isFetching =
    accountInfoLoading ||
    invoiceHistoryLoading ||
    agingInvoicesLoading ||
    subscriberInfoLoading;
  const hasError =
    accountInfoError ||
    invoiceHistoryError ||
    agingInvoicesError ||
    subscriberInfoError;
  if (isFetching) {
    return <Loading />;
  }
  if (hasError) {
    return <Error />;
  }

  let defaultCard = subscriberInfo?.payInfo?.find(
    (card) => card.isDefault === true,
  );
  if (!defaultCard && subscriberInfo?.payInfo?.length > 0) {
    defaultCard = subscriberInfo?.payInfo?.[0];
  }

  return (
    <Box display="flex" flexDirection="column" gap="16px">
      <Box display="flex" flexDirection="row" gap="16px">
        <Box display="flex" flexDirection="column" gap="16px">
          <CurrentBalance
            accountInfo={accountInfo}
            invoiceHistory={invoiceHistory}
          />
          <PaymentCardPreview cardDetails={defaultCard} />
        </Box>
        <Box display="flex" flexDirection="column" gap="16px">
          <DueAmount />
          <BillingCycle />
        </Box>
        <Box display="flex" flexDirection="column" gap="16px">
          <AccountNumber />
        </Box>
      </Box>
      <InvoiceAndPayment
        invoiceHistory={invoiceHistory}
        agingInvoices={agingInvoices}
      />
    </Box>
  );
};
