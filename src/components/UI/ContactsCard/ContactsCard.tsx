import { Box } from "../Box";
import { CardLayout } from "../CardLayout/CardLayout";
import { Typography } from "../Typography";
import { Button } from "../Button";

import { ContactSVG } from "../../SVG/ContactSVG";
import { Badge } from "../Badge/Badge";
import { ClientCustomerContact } from "../../../types/ProfileDetailsInterface";
import { getContactEmailAndNumbers } from "./utils";
import { getContactType } from "./utils";

interface ContactsCardProps {
  contact: ClientCustomerContact;
  onEdit: () => void;
}

export const ContactsCard = ({ contact, onEdit }: ContactsCardProps) => {
  const { emailId, contactNumbers } = getContactEmailAndNumbers(
    contact.clientCommunicationDTOList,
  );

  const isPrimaryContact = contact.primaryContact;
  const isBillingContact = contact.billingContact;

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
            {getContactType(contact.type)}
          </Typography>
          <ContactSVG />
        </Box>
        <Box display="flex" flexDirection="column" gap="4px">
          <Typography weight="semibold">
            {contact.firstName} {contact.lastName}
          </Typography>
          <Typography color="secondaryText">{emailId}</Typography>
          <Typography color="secondaryText">{contactNumbers}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box
            display="flex"
            gap="10px"
            alignItems="center"
            justifyContent="center"
          >
            {isPrimaryContact && (
              <Badge status="Primary Contact" color="primary" />
            )}
            {isBillingContact && (
              <Badge status="Billing Contact" color="primary" />
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
