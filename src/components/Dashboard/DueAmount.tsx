import { useGetAccountInfo } from "../../service/getAccountInfo";
import { useGetUnBilledDetails } from "../../service/getUnBilledDetails";
import { formatToUSD } from "../../utils/formatToUSD";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";

export const DueAmount = () => {
  const { data: accountInfo } = useGetAccountInfo();
  const { data: unbilledDetails } = useGetUnBilledDetails();
  const pendingBillChargeDetails = unbilledDetails?.pendingBillChargeDetails;
  return (
    <Box width="368px" height="247px" className="layoutWithBorder">
      <Box display="flex" flexDirection="column" gap="16px">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
            <Typography color="secondarytext">Due Amount</Typography>
            <Typography size="large" weight="medium" color="errorText">
              {formatToUSD(accountInfo?.currentDue ?? "00")}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography color="secondarytext">Unbilled Amount</Typography>
            <Typography
              size="large"
              weight="medium"
              color="warningText"
              align="right"
            >
              {formatToUSD(accountInfo?.unBilledBalance ?? "00")}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap="9px" padding="0 8px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width="166px">
              <Typography>Non-Reccurring Charges</Typography>
            </Box>
            <Typography weight="medium">
              {pendingBillChargeDetails?.otCharges
                ? formatToUSD(pendingBillChargeDetails?.otCharges)
                : "$0.00"}
            </Typography>
          </Box>

          <hr style={{ border: "1px solid #E6E6E6" }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width="165px">
              <Typography>Recurring Charges</Typography>
            </Box>

            <Typography weight="medium">
              {pendingBillChargeDetails?.recCharges
                ? formatToUSD(pendingBillChargeDetails?.recCharges)
                : "$0.00"}
            </Typography>
          </Box>

          <hr style={{ border: "1px solid #E6E6E6" }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width="165px">
              <Typography>Usage Charges</Typography>
            </Box>

            <Typography weight="medium">
              {pendingBillChargeDetails?.usageCharges
                ? formatToUSD(pendingBillChargeDetails?.usageCharges)
                : "$0.00"}
            </Typography>
          </Box>

          <hr style={{ border: "1px solid #E6E6E6" }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width="165px">
              <Typography>Other Charges</Typography>
            </Box>

            <Typography weight="medium">
              {pendingBillChargeDetails?.otherCharges
                ? formatToUSD(pendingBillChargeDetails?.otherCharges)
                : "$0.00"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
