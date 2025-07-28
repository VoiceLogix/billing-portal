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
import { useUpdateDefaultPayment } from "../../../service/updateDefaultPayment";
import { PayInfoItem } from "../../../types/SubscriberInfoInterface";
import { maskAccountNumber } from "./utils";

interface PaymentCardPreviewProps {
  cardDetails?: PayInfoItem;
  showAutopay?: boolean;
  isDefault?: boolean;
}
export const PaymentCardPreview = ({
  cardDetails,
  showAutopay,
  isDefault,
}: PaymentCardPreviewProps) => {
  const [openPaymentMethodModel, setOpenPaymentMethodModel] = useState(false);

  const { mutateAsync: updateDefaultPayment } = useUpdateDefaultPayment();

  const handleSetAutopay = () => {
    updateDefaultPayment({
      defaultPaymentProfileId: cardDetails?.paymentProfileId,
    });
  };
  const creditCardInfo = cardDetails?.creditCardInfo;
  const eCheckInfo = cardDetails?.echeckInfo;

  const firstName = creditCardInfo?.firstName || eCheckInfo?.accountHolderName;
  const lastName = creditCardInfo?.lastName || "";
  const cardNumber =
    creditCardInfo?.cardNumber ||
    maskAccountNumber(eCheckInfo?.bankAccountNumber);

  const handleCloseModel = () => {
    setOpenPaymentMethodModel(false);
  };
  return (
    <>
      <Model
        open={openPaymentMethodModel}
        handleClose={() => setOpenPaymentMethodModel(false)}
      >
        <PaymentMethodModel
          payInfo={cardDetails}
          handleClose={handleCloseModel}
          isDefault={cardDetails?.isDefault || isDefault}
        />
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
              <Typography color="secondaryText">
                {cardDetails === undefined
                  ? "Payment Methods"
                  : cardDetails?.paymentMethod === "CC"
                  ? "Credit/Debit Card"
                  : "E-Check"}
              </Typography>
              {cardDetails ? (
                <>
                  <div
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    <Typography weight="semibold">
                      {firstName} {lastName}
                    </Typography>
                  </div>
                  <Typography weight="medium">{cardNumber}</Typography>
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
                <Badge
                  status={
                    cardDetails?.paymentMethod === "CC"
                      ? cardDetails.status
                      : "active"
                  }
                />
              </Box>
            ) : (
              <CardSVG />
            )}
          </Box>
          <Box display="flex" justifyContent="space-between">
            {showAutopay && (
              <RadioSelect
                checked={cardDetails.isDefault || isDefault || false}
                onChange={handleSetAutopay}
                label="Autopay"
              />
            )}
            <Button
              padding="small"
              borderColor="blueBorder"
              borderSize="1px"
              bgColor={cardDetails ? "white" : "blueAccent"}
              color={cardDetails ? "blueText" : "white"}
              text={cardDetails ? "Edit" : "Add Payment Method"}
              onClick={() => setOpenPaymentMethodModel(true)}
            />
          </Box>
        </Box>
      </CardLayout>
    </>
  );
};
