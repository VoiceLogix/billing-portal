import { useState } from "react";
import Model from "../UI/Model/Model";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";
import { Loading } from "../UI/Loading";
import { Error } from "../UI/Error";
import { InvoicesDetailsTable } from "./InvoicesDetailsTable";
import { Button } from "../UI/Button";
import { useGetPayInvoiceDetails } from "../../service/getInvoiceListing";
import { InvoiceInfo } from "../../types/InvoiceListingInterface";
import Dropdown from "../UI/Dropdown/Dropdown";

const cardOptions = ["23** **** ***** 1200", "23** **** ***** 1222"];

export const InvoicesDetails = ({
  invoiceDetails,
  setSelectedInvoice,
}: {
  invoiceDetails: InvoiceInfo;
  setSelectedInvoice: React.Dispatch<React.SetStateAction<InvoiceInfo | null>>;
}) => {
  const [open, setOpen] = useState(true);

  const [selectedCard, setSelectedCard] = useState(cardOptions[0]);

  const {
    data: payInvoiceDetails,
    isLoading: payInvoiceDetailsLoading,
    isError: payInvoiceDetailsError,
  } = useGetPayInvoiceDetails(invoiceDetails.invoiceNumber);

  const handleClose = () => {
    setOpen(false);
    setSelectedInvoice(null);
  };

  const handlePay = () => {
    console.log("payInvoiceDetails", payInvoiceDetails);
  };

  return (
    <Model
      open={open}
      handleClose={handleClose}
      title={`Make Payment`}
      width="1000px"
    >
      {payInvoiceDetails && (
        <Box marginTop="24px">
          <Box display="flex" gap="10px">
            <Typography>Invoice Number:</Typography>
            <Typography weight="semibold">
              {invoiceDetails.invoiceNumber}
            </Typography>
          </Box>
          <Box
            display="flex"
            gap="10px"
            flexDirection="column"
            marginTop="20px"
          >
            <Typography>Select Card to pay</Typography>
            <Box display="flex" gap="10px">
              <Dropdown
                value="Select Card"
                items={cardOptions}
                width="360px"
                withBackground={false}
                onChange={(item) => {
                  setSelectedCard(item);
                }}
              />
            </Box>
          </Box>

          <Box
            marginTop="24px"
            display="flex"
            flexDirection="column"
            gap="10px"
          >
            <InvoicesDetailsTable invoiceDetails={invoiceDetails} />
            <Box
              display="flex"
              justifyContent="flex-end"
              marginTop="20px"
              gap="10px"
            >
              <Button
                onClick={handleClose}
                bgColor="bgNeutral"
                text="Close"
                color="neutral"
              />
              <Button onClick={handlePay} bgColor="blueAccent" text="Pay" />
            </Box>
          </Box>
        </Box>
      )}
      {payInvoiceDetailsLoading && <Loading />}
      {payInvoiceDetailsError && <Error />}
    </Model>
  );
};
