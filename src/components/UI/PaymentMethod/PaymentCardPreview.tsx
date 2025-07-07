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
import { ClientCCProfileInfo } from "../../../types/ProfileDetailsInterface";
import { useUpdateDefaultPayment } from "../../../service/updateDefaultPayment";

interface PaymentCardPreviewProps {
  cardDetails?: ClientCCProfileInfo;
  showAutopay?: boolean;
}
export const PaymentCardPreview = ({
  cardDetails,
  showAutopay,
}: PaymentCardPreviewProps) => {
  const [openPaymentMethodModel, setOpenPaymentMethodModel] = useState(false);

  const { mutateAsync: updateDefaultPayment } = useUpdateDefaultPayment();

  const handleSetAutopay = () => {
    updateDefaultPayment({
      defaultPaymentProfileId: cardDetails?.paymentProfileId,
    });
  };
  return (
    <>
      <Model
        open={openPaymentMethodModel}
        handleClose={() => setOpenPaymentMethodModel(false)}
        width="1000px"
        height="800px"
      >
        <PaymentMethodModel card={cardDetails} />
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
              {cardDetails ? (
                <>
                  <div
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    <Typography weight="semibold">
                      {cardDetails?.firstName} {cardDetails?.lastName}
                    </Typography>
                  </div>
                  <Typography weight="medium">
                    {cardDetails?.cardNumber}
                  </Typography>
                </>
              ) : (
                <Typography>
                  You don't have any payment profiles configured. Please add a
                  payment profile to get started.
                </Typography>
              )}
            </Box>
            {cardDetails ? (
              <Box>
                <Badge status={cardDetails?.status} />
              </Box>
            ) : (
              <CardSVG />
            )}
          </Box>
          <Box display="flex" justifyContent="space-between">
            {showAutopay && (
              <RadioSelect
                checked={cardDetails?.default || false}
                onChange={handleSetAutopay}
                label="Autopay"
              />
            )}
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
