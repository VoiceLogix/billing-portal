import { formatToUSD } from "../../utils/formatToUSD";
import { formatDate } from "../../utils/formatDate";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";
import { AccountInfo } from "../../types/AccountInfoInterface";
import { InvoiceHistory } from "../../types/InvoiceInterface";
import { CardLayout } from "../UI/CardLayout/CardLayout";

interface CurrentBalanceProps {
  accountInfo: AccountInfo;
  invoiceHistory: InvoiceHistory;
}

export const CurrentBalance = ({
  accountInfo,
  invoiceHistory,
}: CurrentBalanceProps) => {
  const lastInvoice = invoiceHistory?.invoiceAmounts?.[0] || null;

  return (
    <>
      {accountInfo && (
        <CardLayout width="368px" height="163px">
          <Box display="flex" flexDirection="column" gap="16px">
            <Box display="flex" flexDirection="column">
              <Typography color="secondaryText">Current Balance</Typography>
              <Typography size="large" weight="medium">
                {formatToUSD(accountInfo?.accountBalance ?? 0)}
              </Typography>
            </Box>

            <Box display="flex" flexDirection="column" gap="12px">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding="0 8px"
              >
                <Box width="100px">
                  <Typography>Last Invoice</Typography>
                </Box>
                <Typography color="secondaryText">
                  {lastInvoice?.finalizedDate
                    ? formatDate(lastInvoice.finalizedDate)
                    : "--"}
                </Typography>
                <Typography weight="medium">
                  {lastInvoice?.billAmount
                    ? formatToUSD(lastInvoice.billAmount)
                    : "-"}
                </Typography>
              </Box>

              <hr style={{ border: "1px solid #E6E6E6" }} />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding="0 8px"
              >
                <Box width="100px">
                  <Typography>Last Payment</Typography>
                </Box>
                <Typography color="secondaryText">
                  {accountInfo?.lastPaymentDate
                    ? formatDate(accountInfo.lastPaymentDate)
                    : "--"}
                </Typography>
                <Typography weight="medium">
                  {accountInfo?.lastPaymentAmount
                    ? formatToUSD(accountInfo.lastPaymentAmount)
                    : "-"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardLayout>
      )}
    </>
  );
};
