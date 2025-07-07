import { useState } from "react";
import PaymentMethodModel from "../UI/PaymentMethod/PaymentMethodModel";
import { Box } from "../UI/Box";
import { Button } from "../UI/Button";
import Model from "../UI/Model/Model";
import { PaymentCardPreview } from "../UI/PaymentMethod/PaymentCardPreview";
import { ProfileDetails } from "../../types/ProfileDetailsInterface";

interface PaymentCardsProps {
  profileDetails?: ProfileDetails | null;
}
export const PaymentCards = ({ profileDetails }: PaymentCardsProps) => {
  const [openPaymentMethodModel, setOpenPaymentMethodModel] = useState(false);

  const cards = profileDetails?.clientSubscriberInfo?.clientCCProfileInfoList;

  return (
    <>
      <Model
        open={openPaymentMethodModel}
        handleClose={() => setOpenPaymentMethodModel(false)}
      >
        <PaymentMethodModel />
      </Model>
      <Box>
        <Button bgColor="blueAccent">Add Payment Card</Button>

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
