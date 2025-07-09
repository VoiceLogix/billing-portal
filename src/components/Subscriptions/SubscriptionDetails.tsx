import Model from "../UI/Model/Model";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";
import { formatDate } from "../../utils/formatDate";
import { Button } from "../UI/Button";
import { Badge } from "../UI/Badge/Badge";
import { SubscriptionInstance } from "../../types/SubscriptionInterface";
import { SubscriptionDetailsTable } from "./SubscriptionDetailsTable";
import { getStatus } from "./utils";

interface SubscriptionDetailsProps {
  subscription: SubscriptionInstance;
  handleClose: () => void;
}
const infoGroups = (subscription: SubscriptionInstance) => [
  [
    { label: "Product Name:", value: subscription.productName },
    { label: "Price plan name:", value: subscription.pricePlanName },
  ],
  [
    {
      label: "Service start:",
      value: formatDate(subscription.activationStartDate),
    },
    {
      label: "Service end:",
      value: formatDate(subscription.details.expirationDate),
    },
  ],
  [
    {
      label: "Last charged:",
      value: subscription.details.lastChargeDate
        ? formatDate(subscription.details.lastChargeDate)
        : "N/A",
    },
    {
      label: "Next charge:",
      value: formatDate(subscription.details.nextChargeDate),
    },
  ],
];

export const SubscriptionDetails = ({
  subscription,
  handleClose,
}: SubscriptionDetailsProps) => {
  return (
    <Model
      open={true}
      showCloseButton={false}
      handleClose={handleClose}
      width="1000px"
    >
      {subscription && (
        <Box>
          <Box display="flex" flexDirection="column" gap="20px">
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" flexDirection="column">
                <Typography color="secondaryText">
                  Subscription Identifier
                </Typography>
                <Typography size="large" weight="medium">
                  {subscription.identifier}
                </Typography>
              </Box>
              <Box>
                <Badge status={getStatus(subscription.status)} />
              </Box>
            </Box>
            <Box display="flex" gap="100px">
              {infoGroups(subscription).map((group, i) => (
                <Box display="flex" flexDirection="column" gap="8px" key={i}>
                  {group.map(({ label, value }) => (
                    <Box display="flex" key={label} alignItems="center">
                      <Box width="120px">
                        <Typography color="secondaryText">{label}</Typography>
                      </Box>
                      <Typography weight="medium">{value}</Typography>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
          <Box marginTop="24px">
            <SubscriptionDetailsTable
              chargeDetails={subscription.details.clientChargeDetails}
              quantity={subscription.quantity}
            />
          </Box>
          <Box
            marginTop="24px"
            display="flex"
            flexDirection="column"
            gap="10px"
          >
            <Box display="flex" justifyContent="flex-end" marginTop="20px">
              <Button
                onClick={handleClose}
                bgColor="bgNeutral"
                text="Close"
                color="neutral"
              />
            </Box>
          </Box>
        </Box>
      )}
    </Model>
  );
};
