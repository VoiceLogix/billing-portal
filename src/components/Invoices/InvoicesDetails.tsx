import { useState } from "react";
import Model from "../UI/Model/Model";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";
import { Loading } from "../UI/Loading";
import { Error } from "../UI/Error";
import { InvoicesDetailsTable } from "./InvoicesDetailsTable";
import { Button } from "../UI/Button";
import { useGetPayInvoiceDetails } from "../../service/billing_center/getInvoiceListing";
import { InvoiceInfo } from "../../types/InvoiceListingInterface";
import Dropdown from "../UI/Dropdown/Dropdown";
import { useGetSubscriberInfo } from "../../service/billing_center/getSubscriberInfo";
import { usePayInvoice } from "../../service/billing_center/payinvoice";
import { Notification } from "../UI/Notification/Notification";

export const InvoicesDetails = ({
  invoiceDetails,
  setSelectedInvoice,
}: {
  invoiceDetails: InvoiceInfo;
  setSelectedInvoice: React.Dispatch<React.SetStateAction<InvoiceInfo | null>>;
}) => {
  const [open, setOpen] = useState(true);
  const { data: subscriberInfo } = useGetSubscriberInfo();

  const defaultCard = subscriberInfo?.payInfo?.find(
    (card) => card.isDefault || card.status === "Active",
  );

  const [selectedCard, setSelectedCard] = useState(defaultCard);
  const [amount, setAmount] = useState<string | null>(
    invoiceDetails.dueAmount.toString(),
  );

  const {
    data: payInvoiceDetails,
    isLoading: payInvoiceDetailsLoading,
    isError: payInvoiceDetailsError,
  } = useGetPayInvoiceDetails(invoiceDetails.invoiceNumber);

  const {
    mutateAsync: payInvoice,
    isPending: payInvoicePending,
    isSuccess: payInvoiceSuccess,
    isError: payInvoiceError,
  } = usePayInvoice();

  const handleClose = () => {
    setOpen(false);
    setSelectedInvoice(null);
  };

  const handlePay = async () => {
    await payInvoice({
      invoiceNumber: invoiceDetails.invoiceNumber,
      makePayment: false,
      oneTimePayment: false,
      paymentAmount: amount,
      paymentAttributeValues: [],
      paymentProfileId: selectedCard?.paymentProfileId,
    });
    setTimeout(() => {
      handleClose();
    }, 2000);
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
                value={selectedCard?.creditCardInfo.cardNumber || "Select Card"}
                items={subscriberInfo?.payInfo?.map(
                  (card) => card.creditCardInfo.cardNumber,
                )}
                width="360px"
                withBackground={false}
                onChange={(item) => {
                  setSelectedCard(
                    subscriberInfo?.payInfo?.find(
                      (card) => card.creditCardInfo.cardNumber === item,
                    ),
                  );
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
            <InvoicesDetailsTable
              amount={amount}
              setAmount={setAmount}
              invoiceDetails={invoiceDetails}
            />

            <Notification
              type={payInvoiceSuccess ? "success" : "error"}
              message={
                payInvoiceSuccess
                  ? "Payment successful"
                  : "Payment failed, please try again"
              }
              showNotification={payInvoiceSuccess || payInvoiceError}
            />

            <Box display="flex" justifyContent="flex-end" gap="10px">
              <Button
                onClick={handleClose}
                bgColor="bgNeutral"
                text="Close"
                color="neutral"
                disabled={payInvoicePending}
              />
              <Button
                onClick={handlePay}
                bgColor="blueAccent"
                text="Pay"
                disabled={payInvoicePending}
                isLoading={payInvoicePending}
              />
            </Box>
          </Box>
        </Box>
      )}
      {payInvoiceDetailsLoading && <Loading />}
      {payInvoiceDetailsError && <Error />}
    </Model>
  );
};
