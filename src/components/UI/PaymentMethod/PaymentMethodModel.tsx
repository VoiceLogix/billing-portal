import React, { useEffect } from "react";
import { Box } from "../Box";
import { Typography } from "../Typography";
import { PayInfo } from "../../../types/BillingSubscriberResult";
import { useGetPaymentGateWayUrl } from "../../../service/getPaymentGateWayUrl";
import { Button } from "../Button";
import axios from "axios";

interface Props {
  card?: PayInfo;
}

const PaymentMethodModal: React.FC<Props> = ({ card }) => {
  console.log("referenceKey", card?.referenceKey || null);

  const { data: gatewayData } = useGetPaymentGateWayUrl(
    card?.referenceKey || null,
  );

  console.log("gatewayData", gatewayData);
  const handleCancel = () => {
    console.log("handleCancel");
  };

  const handleSave = () => {
    console.log("handleSave");
  };

  return (
    <Box width="100%" height="100%" padding="24px">
      <Box display="flex" flexDirection="column" marginBottom="24px">
        <Typography size="big" weight="semibold">
          Add New Payment Method
        </Typography>
        <Typography color="secondaryText">
          Please fill all required fields
        </Typography>
      </Box>
      <iframe
        src={gatewayData?.paymentGatewayUrl}
        width="100%"
        height="90%"
        style={{ border: "none" }}
      />
      {/* <Box display="flex" justifyContent="flex-end" gap="12px">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button bgColor="blueAccent" onClick={handleSave} type="submit">
          {"Save"}
        </Button>
      </Box> */}
    </Box>
  );
};

export default PaymentMethodModal;
