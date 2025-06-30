import { CardLayout } from "../UI/CardLayout/CardLayout";
import { Typography } from "../UI/Typography";
import { Box } from "../UI/Box";
import { ClientSubscriberInfo } from "../../types/ProfileDetailsInterface";
import { formatDate, formatDateRange } from "../../utils/formatDate";

interface AccountOverviewProps {
  ClientSubscriberInfo: ClientSubscriberInfo;
}

export const AccountOverview = ({
  ClientSubscriberInfo,
}: AccountOverviewProps) => {
  return (
    <CardLayout height="275px">
      <Box display="flex" flexDirection="column" gap="16px">
        <Box display="flex" flexDirection="column">
          <Typography color="secondaryText">Company name</Typography>
          <Typography size="large" weight="medium">
            {ClientSubscriberInfo?.accountingDisplayName}
          </Typography>
        </Box>
        <Box
          display="flex"
          gap="50px"
          justifyContent="space-between"
          marginTop="16px"
        >
          <Box display="flex" flexDirection="column" gap="16px" width="50%">
            <ItemRow
              label="Account number"
              value={ClientSubscriberInfo?.accountNumber}
            />
            <ItemRow
              label="Accounting name"
              value={ClientSubscriberInfo?.accountingDisplayName}
            />
            <ItemRow
              label="Activation Start"
              value={formatDate(ClientSubscriberInfo?.activationStartDate)}
            />
            <ItemRow
              label="Activation type"
              value={ClientSubscriberInfo?.partyTypeString}
              showBorder={false}
            />
          </Box>
          <Box display="flex" flexDirection="column" gap="16px" width="50%">
            <ItemRow
              label="Billing cycle"
              value={formatDateRange(
                ClientSubscriberInfo?.billCycleStartDate,
                ClientSubscriberInfo?.billCycleEndDate,
              )}
            />
            <ItemRow
              label="Billing day of month"
              value={ClientSubscriberInfo?.billingDom.toString()}
            />
            <ItemRow
              label="Payment term"
              value={
                ClientSubscriberInfo?.paymentDueInterval.toString() + " days"
              }
            />
            <ItemRow label="Currency" value="USD" showBorder={false} />
          </Box>
        </Box>
      </Box>
    </CardLayout>
  );
};

interface ItemRowProps {
  label: string;
  value: string;
  showBorder?: boolean;
}

const ItemRow = ({ label, value, showBorder = true }: ItemRowProps) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      gap="40px"
      borderBottom={showBorder ? "1px solid var(--color-border)" : "none"}
      paddingBottom="5px"
    >
      <Box width="150px">
        <Typography color="secondaryText">{label}</Typography>
      </Box>
      <Typography weight="medium">{value}</Typography>
    </Box>
  );
};
