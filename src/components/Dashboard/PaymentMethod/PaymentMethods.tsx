import { useState } from "react";
import { useGetPaymentGateWayUrl } from "../../../service/getPaymentGateWayUrl";
import CardSVG from "../../SVG/CardSVG";
import { theme } from "../../theme";
import { Box } from "../../UI/Box";
import Model from "../../UI/Model/Model";
import { Typography } from "../../UI/Typography";
import PaymentMethodModel from "./PaymentMethodModel";

export const PaymentMethods = () => {
  const accountDetails = {
    name: null,
    accountNumber: null,
  };
  // const { data: paymentGateWay } = useGetPaymentGateWayUrl();
  // console.log("Payment Gateway Data:", paymentGateWay);

  const [openPaymentMethodModel, setOpenPaymentMethodModel] = useState(false);
  const handleReplaceCard = () => {};
  return (
    <>
      <Model
        open={openPaymentMethodModel}
        handleClose={() => setOpenPaymentMethodModel(false)}
      >
        <PaymentMethodModel />
      </Model>
      <Box className="layoutWithBorder" width="368px" height="152px">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box display="flex" flexDirection="column" gap="6px" width={300}>
            <Typography color="secondarytext">Payment Methods</Typography>
            {accountDetails.name ? (
              <>
                <Typography weight="medium">{accountDetails.name}</Typography>
                <Typography>{accountDetails.accountNumber}</Typography>
              </>
            ) : (
              <Typography>
                You don't have any payment profiles configured. Please add a
                payment profile to get started.
              </Typography>
            )}
            <Box
              border={`1px solid ${theme.colors.blueText}`}
              borderRadius="4px"
              height="32px"
              display="flex"
              justifyContent="center"
              bgColor={accountDetails.name ? "" : theme.colors.lightBlue}
              alignItems="center"
              onClick={handleReplaceCard}
              style={{ cursor: "pointer", maxWidth: "156px" }}
            >
              {accountDetails.name ? (
                <Typography color="blueText" weight="medium">
                  Edit
                </Typography>
              ) : (
                <Typography
                  color="white"
                  weight="medium"
                  onClick={() => setOpenPaymentMethodModel(true)}
                >
                  Add Payment Method
                </Typography>
              )}
            </Box>
          </Box>

          <CardSVG />
        </Box>
      </Box>
    </>
  );
};
