import { Box } from "./Box";
import { CardLayout } from "./CardLayout/CardLayout";
import { Typography } from "./Typography";
import { AddressSVG } from "../SVG/AddressSVG";
import { Button } from "./Button";
import { Badge } from "./Badge/Badge";

interface AddressCardProps {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefaultBilling: boolean;
  isDefaultService: boolean;
  onEdit: () => void;
}

export const AddressCard = ({
  addressLine1,
  addressLine2,
  city,
  state,
  zip,
  country,
  isDefaultBilling,
  isDefaultService,
  onEdit,
}: AddressCardProps) => {
  return (
    <CardLayout width="368px" height="212px">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="stretch"
        height="100%"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography color="secondaryText">
            {zip}, {country}, {state}
          </Typography>
          <AddressSVG />
        </Box>
        <Box display="flex" flexDirection="column" gap="4px">
          <Typography weight="semibold">{city}</Typography>
          <Typography weight="semibold">
            {addressLine1}, {addressLine2}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap="10px">
            {isDefaultBilling && (
              <Badge status="Default for Billing" color="primary" />
            )}
            {isDefaultService && (
              <Badge status="Default for Service" color="primary" />
            )}
          </Box>
          <Button
            color="blueAccent"
            borderColor="blueBorder"
            borderSize="1px"
            height="22px"
            onClick={onEdit}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </CardLayout>
  );
};
