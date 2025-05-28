import { CurrentBalance } from "./CurrentBalance";
import { PaymentMethods } from "./PaymentMethods";
import { Box } from "../UI/Box";
import { DueAmount } from "./DueAmount";
import { BillingCycle } from "./BillingCycle";
import { AccountNumber } from "./AccountNumber";
import { LoadingSVG } from "../SVG/LoadingSVG";
import { useGetAccountInfo } from "../../service/getAccountInfo";
import { useGetInvoiceHistory } from "../../service/getInvoiceHistory";
import { Typography } from "../UI/Typography";

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

  const isFetching = accountInfoLoading || invoiceHistoryLoading;
  const hasError = acoountInfoError || invoiceHistoryError;
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
  );
};
