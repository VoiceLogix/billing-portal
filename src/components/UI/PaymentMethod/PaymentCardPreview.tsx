import { useState } from "react";
import CardSVG from "../../SVG/CardSVG";
import Model from "../Model/Model";
import { Box } from "../Box";
import { Typography } from "../Typography";
import PaymentMethodModel from "./PaymentMethodModel";
import { Button } from "../Button";
import { Badge } from "../Badge/Badge";
import { CardLayout } from "../CardLayout/CardLayout";
import { useGetSubscriberInfo } from "../../../service/getSubscriberInfo";

export const PaymentCardPreview = () => {
  const { data: subscriberInfo } = useGetSubscriberInfo();

  const defaultCard = subscriberInfo?.payInfo?.find(
    (card) => card.isDefault || card.status === "Active",
  );

  const [openPaymentMethodModel, setOpenPaymentMethodModel] = useState(false);
  return (
    <>
      <Model
        open={openPaymentMethodModel}
        handleClose={() => setOpenPaymentMethodModel(false)}
        width="1000px"
        height="800px"
      >
        <PaymentMethodModel card={defaultCard} />
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
              {defaultCard ? (
                <>
                  <div
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    <Typography weight="semibold">
                      {defaultCard?.creditCardInfo.firstName}{" "}
                      {defaultCard?.creditCardInfo.lastName}
                    </Typography>
                  </div>
                  <Typography weight="medium">
                    {defaultCard?.creditCardInfo.cardNumber}
                  </Typography>
                </>
              ) : (
                <Typography>
                  You don't have any payment profiles configured. Please add a
                  payment profile to get started.
                </Typography>
              )}
            </Box>
            {defaultCard ? (
              <Box>
                <Badge status={defaultCard?.status} />
              </Box>
            ) : (
              <CardSVG />
            )}
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button
              padding="small"
              borderColor="blueBorder"
              borderSize="1px"
              bgColor="white"
              color="blueText"
              text="Edit Method"
              onClick={() => setOpenPaymentMethodModel(true)}
            />
          </Box>
        </Box>
      </CardLayout>
    </>
  );
};
