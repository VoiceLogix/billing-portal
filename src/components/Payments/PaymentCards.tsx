import { useState } from "react";
import PaymentMethodModel from "../UI/PaymentMethod/PaymentMethodModel";
import { Box } from "../UI/Box";
import { Button } from "../UI/Button";
import Model from "../UI/Model/Model";
import { PaymentCardPreview } from "../UI/PaymentMethod/PaymentCardPreview";

export const PaymentCards = () => {
  const [openPaymentMethodModel, setOpenPaymentMethodModel] = useState(false);
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
          <PaymentCardPreview />
          <PaymentCardPreview />
          <PaymentCardPreview />
        </Box>
      </Box>
    </>
  );
};
