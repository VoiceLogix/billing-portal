import { useState } from "react";
import CardSVG from "../../SVG/CardSVG";
import Model from "../Model/Model";
import { Box } from "../Box";
import { Typography } from "../Typography";
import PaymentMethodModel from "./PaymentMethodModel";
import { Button } from "../Button";
import { Badge } from "../Badge/Badge";
import { CardLayout } from "../CardLayout/CardLayout";
import { RadioSelect } from "../RadioSelect/RadioSelect";

export const PaymentCardPreview = ({
  autoPay = true,
}: {
  autoPay?: boolean;
}) => {
  const accountDetails = {
    name: "Michael Schott",
    accountNumber: "**** **** ***** 1200",
    status: "active",
  };

  const [openPaymentMethodModel, setOpenPaymentMethodModel] = useState(false);
  return (
    <>
      <Model
        open={openPaymentMethodModel}
        handleClose={() => setOpenPaymentMethodModel(false)}
      >
        <PaymentMethodModel />
      </Model>
      <CardLayout width="368px" height="152px">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box display="flex" flexDirection="column" gap="6px">
              <Typography color="secondaryText">Payment Methods</Typography>
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
            </Box>
            {accountDetails.name ? (
              <Box>
                <Badge status={accountDetails.status} />
              </Box>
            ) : (
              <CardSVG />
            )}
          </Box>
          <Box display="flex" justifyContent="space-between">
            {autoPay && <RadioSelect label="Autopay" checked={true} />}
            <Button
              padding="small"
              borderColor="blueBorder"
              borderSize="1px"
              bgColor="white"
              color="blueText"
              text="Edit"
              onClick={() => setOpenPaymentMethodModel(true)}
            />
          </Box>
        </Box>
      </CardLayout>
    </>
  );
};
