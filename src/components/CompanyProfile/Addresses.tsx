import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";
import { AddressCard } from "../UI/AddressCard";
import { Address, ClientCountryDTO } from "../../types/ProfileDetailsInterface";
import { useState } from "react";
import { Button } from "../UI/Button";
import { AddressModel } from "./AddressModel";

export const Addresses = ({
  lstAddresses,
  clientCountryDTOList,
}: {
  lstAddresses: Address[] | null;
  clientCountryDTOList: ClientCountryDTO[];
}) => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsAddAddressModalOpen(true);
  };

  const handleAddAddress = () => {
    setSelectedAddress(null);
    setIsAddAddressModalOpen(true);
  };

  const handleCloseAddressModel = () => {
    setIsAddAddressModalOpen(false);
    setSelectedAddress(null);
  };

  return (
    <Box>
      {isAddAddressModalOpen && (
        <AddressModel
          openAddressModel={isAddAddressModalOpen}
          handleClose={handleCloseAddressModel}
          selectedAddress={selectedAddress}
          clientCountryDTOList={clientCountryDTOList}
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
          <Typography size="large">Addresses</Typography>
          <Button bgColor="blueAccent" onClick={handleAddAddress}>
            Add Address
          </Button>
        </Box>
      </Box>
      <Box display="flex" gap="16px" marginTop="16px" flexWrap="wrap">
        {lstAddresses
          ?.sort(
            (a, b) =>
              Number(b.isDefaultBilling) - Number(a.isDefaultBilling) ||
              Number(b.isDefaultShipping) - Number(a.isDefaultShipping),
          )
          ?.map((address) => (
            <AddressCard
              key={address?.id}
              addressLine1={address?.addLine1}
              addressLine2={address?.addLine2}
              city={address?.city}
              state={address?.state}
              zip={address?.zip}
              country={address?.country}
              isDefaultBilling={address?.isDefaultBilling}
              isDefaultService={address?.isDefaultShipping}
              onEdit={() => handleEditAddress(address)}
            />
          ))}
      </Box>
    </Box>
  );
};
