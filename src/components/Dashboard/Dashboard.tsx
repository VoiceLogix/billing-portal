import { CurrentBalance } from "./CurrentBalance";
import { PaymentMethods } from "./PaymentMethod/PaymentMethods";
import { Box } from "../UI/Box";
import { DueAmount } from "./DueAmount";
import { BillingCycle } from "./BillingCycle";
import { AccountNumber } from "./AccountNumber";
import { LoadingSVG } from "../SVG/LoadingSVG";
import { useGetAccountInfo } from "../../service/getAccountInfo";
import { useGetInvoiceHistory } from "../../service/getInvoiceHistory";
import { Typography } from "../UI/Typography";
import { InvoiceAndPayment } from "./InvoiceAndPayment";
import { useGetAgingInvoices } from "../../service/getAgingInvoices";

export const Dashboard = () => {
  const {
    data: accountInfo,
    isLoading: accountInfoLoading,
    isError: acoountInfoError,
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

  const isFetching =
    accountInfoLoading || invoiceHistoryLoading || agingInvoicesLoading;
  const hasError =
    acoountInfoError || invoiceHistoryError || agingInvoicesError;
  if (isFetching) {
    return (
      <Box
        width="100%"
        height="500px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <LoadingSVG />
      </Box>
    );
  }
  if (hasError) {
    return (
      <Box
        width="100%"
        height="500px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography color="errorText">Error loading data</Typography>
      </Box>
    );
  }
  return (
    <Box display="flex" flexDirection="column" gap="16px">
      <Box display="flex" flexDirection="row" gap="16px">
        <Box display="flex" flexDirection="column" gap="16px">
          <CurrentBalance
            accountInfo={accountInfo}
            invoiceHistory={invoiceHistory}
          />
          <PaymentMethods />
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
