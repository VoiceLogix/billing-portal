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
import { useGetProfileDetails } from "../../service/getProfileDetails";

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
    data: profileDetails,
    isLoading: profileDetailsLoading,
    isError: profileDetailsError,
  } = useGetProfileDetails();

  const defaultCard =
    profileDetails?.clientSubscriberInfo?.clientCCProfileInfoList?.find(
      (card) => card.default || card.status === "Active",
    );

  const isFetching =
    accountInfoLoading ||
    invoiceHistoryLoading ||
    agingInvoicesLoading ||
    profileDetailsLoading;
  const hasError =
    accountInfoError ||
    invoiceHistoryError ||
    agingInvoicesError ||
    profileDetailsError;
  if (isFetching) {
    return <Loading />;
  }
  if (hasError) {
    return <Error />;
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
