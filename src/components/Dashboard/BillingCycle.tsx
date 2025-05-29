import { useGetUnBilledDetails } from "../../service/getUnBilledDetails";
import { formatDateRange } from "../../utils/formatDate";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";

export const BillingCycle = () => {
  const { data: unbilledDetails } = useGetUnBilledDetails();
  const pendingBillChargeDetails = unbilledDetails?.pendingBillChargeDetails;
  return (
    <Box className="layoutWithBorder" width="368px" height="68px">
      <Box display="flex" flexDirection="column" gap="5px">
        <Typography color="secondarytext">Billing Cycle</Typography>
        <Typography weight="medium">
          {formatDateRange(
            pendingBillChargeDetails?.cycleStartDate,
            pendingBillChargeDetails?.cycleEndDate,
          )}
        </Typography>
      </Box>
    </Box>
  );
};
