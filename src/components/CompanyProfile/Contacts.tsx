import { useState } from "react";
import { Box } from "../UI/Box";
import { ContactsCard } from "../UI/ContactsCard/ContactsCard";
import { Typography } from "../UI/Typography";
import { Button } from "../UI/Button";
import { ClientCustomerContact } from "../../types/ProfileDetailsInterface";
import { ContactModel } from "./ContactModel";

interface ContactsProps {
  contacts: ClientCustomerContact[];
}

export const Contacts = ({ contacts }: ContactsProps) => {
  const [selectedContact, setSelectedContact] =
    useState<ClientCustomerContact | null>(null);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const handleEditContact = (contact: ClientCustomerContact) => {
    setSelectedContact(contact);
    setIsAddContactModalOpen(true);
  };

  const handleAddContact = () => {
    setIsAddContactModalOpen(true);
  };

  const handleCloseContactModel = () => {
    setIsAddContactModalOpen(false);
    setSelectedContact(null);
  };

  return (
    <Box>
      {isAddContactModalOpen && (
        <ContactModel
          openContactModel={isAddContactModalOpen}
          handleClose={handleCloseContactModel}
          selectedContact={selectedContact}
        />
      )}
      <Box
        display="flex"
        flexDirection="column"
        gap="16px"
        marginTop="40px"
        borderBottom="1px solid var(--color-border)"
        paddingBottom="10px"
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography size="large">Contacts</Typography>
          <Button bgColor="blueAccent" onClick={handleAddContact}>
            Add Contact
          </Button>
        </Box>
      </Box>
      <Box display="flex" gap="16px" marginTop="16px" flexWrap="wrap">
        {contacts
          ?.sort(
            (a, b) =>
              Number(b.primaryContact) - Number(a.primaryContact) ||
              Number(b.billingContact) - Number(a.billingContact),
          )
          ?.map((contact) => (
            <ContactsCard
              contact={contact}
              onEdit={() => handleEditContact(contact)}
            />
          ))}
      </Box>
    </Box>
  );
};
