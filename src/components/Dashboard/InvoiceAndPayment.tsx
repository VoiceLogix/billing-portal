import { AgingInvoices } from "../../types/AgingInvoicesInterface";
import { InvoiceHistory } from "../../types/InvoiceInterface";
import { formatToUSD } from "../../utils/formatToUSD";
import { theme } from "../theme";
import { Box } from "../UI/Box";
import { CardLayout } from "../UI/CardLayout/CardLayout";
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
      <CardLayout width="1136px">
        <Box height="271px" display="flex" gap="40px">
          <Box width="740px">
            <Box display="flex" justifyContent="space-between">
              <Typography color="secondaryText">Invoice / Payment</Typography>
              <Box display="flex" gap="20px">
                <Box display="flex" gap="8px" alignItems="center">
                  <Box
                    borderRadius="50%"
                    width="8px"
                    height="8px"
                    bgColor={theme.colors.gray}
                  />

                  <Typography color="secondaryText">Invoice</Typography>
                </Box>
                <Box display="flex" gap="8px" alignItems="center">
                  <Box
                    borderRadius="50%"
                    width="8px"
                    height="8px"
                    bgColor={theme.colors.blueAccent}
                  />
                  <Typography color="secondaryText">Payment</Typography>
                </Box>
              </Box>
            </Box>
            <MonthlyBarChart invoiceHistory={invoiceHistory} />
          </Box>
          <Box display="flex" flexDirection="column" gap="10px" width="368px">
            <Typography color="secondaryText">Invoice Aging Data</Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              marginTop="10px"
            >
              <MonthlyDonutChart agingInvoices={agingInvoices} />
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography color="secondaryText">Total Due</Typography>
              <Typography size="large" weight="medium">
                {formatToUSD(
                  agingInvoices?.agingInvoiceDetails?.notDueYet +
                    agingInvoices?.agingInvoiceDetails?.oneToThrityDaysDue +
                    agingInvoices?.agingInvoiceDetails?.thirtyToSixtyDaysDue +
                    agingInvoices?.agingInvoiceDetails?.sixtyToNinetyDaysDue,
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardLayout>
    </>
  );
};
