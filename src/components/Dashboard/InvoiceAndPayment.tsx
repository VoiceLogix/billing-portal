import { AgingInvoices } from "../../types/AgingInvoicesInterface";
import { InvoiceHistory } from "../../types/InvoiceInterface";
import { formatToUSD } from "../../utils/formatToUSD";
import { theme } from "../theme";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";
import MonthlyBarChart from "./MonthlyBarChart";
import MonthlyDonutChart from "./MonthlyDonutChart";

interface InvoiceAndPaymentProps {
  invoiceHistory: InvoiceHistory;
  agingInvoices: AgingInvoices;
}

export const InvoiceAndPayment = ({
  invoiceHistory,
  agingInvoices,
}: InvoiceAndPaymentProps) => {
  return (
    <>
      <Box
        className="layoutWithBorder"
        width="1136px"
        height="271px"
        display="flex"
        gap="40px"
      >
        <Box width="740px">
          <Box display="flex" justifyContent="space-between">
            <Typography color="secondarytext">Invoice / Payment</Typography>
            <Box display="flex" gap="20px">
              <Box display="flex" gap="8px" alignItems="center">
                <Box
                  borderRadius="50%"
                  width="8px"
                  height="8px"
                  bgColor={theme.colors.gray}
                />

                <Typography color="secondarytext">Invoice</Typography>
              </Box>
              <Box display="flex" gap="8px" alignItems="center">
                <Box
                  borderRadius="50%"
                  width="8px"
                  height="8px"
                  bgColor={theme.colors.blueAccent}
                />
                <Typography color="secondarytext">Payment</Typography>
              </Box>
            </Box>
          </Box>
          <MonthlyBarChart invoiceHistory={invoiceHistory} />
        </Box>
        <Box display="flex" flexDirection="column" gap="10px" width="368px">
          <Typography color="secondarytext">Invoice Aging Data</Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <MonthlyDonutChart agingInvoices={agingInvoices} />
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography color="secondarytext">Total Due</Typography>
            <Typography size="large" weight="medium">
              {formatToUSD(agingInvoices.agingInvoiceDetails.notDueYet ?? 0)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
