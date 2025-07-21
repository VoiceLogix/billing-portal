import { useState } from "react";
import PaymentMethodModel from "../UI/PaymentMethod/PaymentMethodModel";
import { Box } from "../UI/Box";
import { Button } from "../UI/Button";
import Model from "../UI/Model/Model";
import { PaymentCardPreview } from "../UI/PaymentMethod/PaymentCardPreview";
import { SubscriberInfo } from "../../types/SubscriberInfoInterface";

interface PaymentCardsProps {
  subscriberInfo: SubscriberInfo;
}
export const PaymentCards = ({ subscriberInfo }: PaymentCardsProps) => {
  const cards = subscriberInfo.payInfo;
  const [openPaymentMethodModel, setOpenPaymentMethodModel] = useState(
    cards?.length === 0,
  );

  const handleAddPaymentCard = () => {
    setOpenPaymentMethodModel(true);
  };
  const handleClose = () => {
    setOpenPaymentMethodModel(false);
  };
  return (
    <>
      <Model
        open={openPaymentMethodModel}
        handleClose={() => setOpenPaymentMethodModel(false)}
      >
        <PaymentMethodModel handleClose={handleClose} />
      </Model>
      <Box>
        <Button onClick={handleAddPaymentCard} bgColor="blueAccent">
          Add Payment Card
        </Button>

        <Box display="flex" flexDirection="column" gap="16px" marginTop="20px">
          {cards?.map((card) => (
            <PaymentCardPreview
              key={card.paymentProfileId}
              cardDetails={card}
              showAutopay={true}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
