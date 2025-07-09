import { Box } from "../UI/Box";
import { CardLayout } from "../UI/CardLayout/CardLayout";
import { Typography } from "../UI/Typography";
import { SubscriptionInstance } from "../../types/SubscriptionInterface";
import { formatDate } from "../../utils/formatDate";
import { formatToUSD } from "../../utils/formatToUSD";
import { Badge } from "../UI/Badge/Badge";
import { Button } from "../UI/Button";
import { SubscriptionDetails } from "./SubscriptionDetails";
import { useState } from "react";
import { getStatus } from "./utils";

interface SubscriptionItemProps {
  subscription: SubscriptionInstance;
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
      label: "Charges:",
      value:
        subscription.details.chargingFrequency === "MONTHLY"
          ? "Recurrent"
          : "Non-Recurrent",
    },
    {
      label: "Next charge:",
      value: formatDate(subscription.details.nextChargeDate),
    },
  ],
  [
    { label: "Active units:", value: `${subscription.details.quantity} users` },
    {
      label: "Unit price:",
      value: formatToUSD(subscription.details.unitPrice),
    },
  ],
];

const SubscriptionItem = ({ subscription }: SubscriptionItemProps) => {
  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionInstance | null>(null);
  const handleDetailsClick = (subscription: SubscriptionInstance) => {
    setSelectedSubscription(subscription);
  };
  const handleCloseDetails = () => {
    setSelectedSubscription(null);
  };
  return (
    <Box minWidth="1200px" width="fit-content">
      {selectedSubscription && (
        <SubscriptionDetails
          subscription={selectedSubscription}
          handleClose={handleCloseDetails}
        />
      )}
      <CardLayout width="100%" height="200px">
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
          <Box>
            <Button
              color="blueAccent"
              borderColor="blueAccent"
              borderSize="1px"
              text="Details"
              onClick={() => handleDetailsClick(subscription)}
            />
          </Box>
        </Box>
      </CardLayout>
    </Box>
  );
};

export default SubscriptionItem;
