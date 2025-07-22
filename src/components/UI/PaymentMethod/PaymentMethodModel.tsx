import { PayInfoItem } from "../../../types/SubscriberInfoInterface";
import { Box } from "../Box";
import TabsComponent from "../Tabs/Tabs";
import { Typography } from "../Typography";
import CardForm from "./CardForm";
import ECheckForm from "./ECheckForm";

interface PaymentMethodModelProps {
  payInfo?: PayInfoItem;
  handleClose: () => void;
}

const PaymentMethodModel = ({
  payInfo,
  handleClose,
}: PaymentMethodModelProps) => {
  const isAddNewPayment = !payInfo;
  const isCreditCard =
    payInfo?.creditCardInfo && payInfo?.paymentMethod === "CC";

  return (
    <Box>
      <Box display="flex" flexDirection="column">
        <Typography size="big" weight="semibold">
          {`${isAddNewPayment ? "Add New" : "Edit"} Payment Method`}
        </Typography>
        <Typography color="secondaryText">
          Please fill all required fields
        </Typography>
      </Box>
      <Box marginTop="24px">
        {isAddNewPayment && (
          <TabsComponent
            tabs={[
              {
                label: "Credit/Debit Card",
                content: (
                  <CardForm payInfo={payInfo} handleClose={handleClose} />
                ),
              },
              {
                label: "E-Check",
                content: (
                  <ECheckForm payInfo={payInfo} handleClose={handleClose} />
                ),
              },
            ]}
          />
        )}

        {!isAddNewPayment && isCreditCard && (
          <CardForm payInfo={payInfo} handleClose={handleClose} />
        )}
        {!isAddNewPayment && !isCreditCard && (
          <ECheckForm payInfo={payInfo} handleClose={handleClose} />
        )}
      </Box>
    </Box>
  );
};

export default PaymentMethodModel;
