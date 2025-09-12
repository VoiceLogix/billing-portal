import { useGetUnBilledDetails } from "../../service/billing_center/getUnBilledDetails";
import { formatDateRange } from "../../utils/formatDate";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";
import { CardLayout } from "../UI/CardLayout/CardLayout";

export const BillingCycle = () => {
  const { data: unbilledDetails } = useGetUnBilledDetails();
  const pendingBillChargeDetails = unbilledDetails?.pendingBillChargeDetails;
  return (
    <CardLayout width="368px" height="68px">
      <Box display="flex" flexDirection="column" gap="5px">
        <Typography color="secondaryText">Billing Cycle</Typography>
        <Typography weight="medium">
          {formatDateRange(
            pendingBillChargeDetails?.cycleStartDate,
            pendingBillChargeDetails?.cycleEndDate,
          )}
        </Typography>
      </Box>
    </CardLayout>
  );
};
