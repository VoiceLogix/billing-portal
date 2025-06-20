import { Box } from "../../UI/Box";
import TabsComponent from "../../UI/Tabs/Tabs";
import { Typography } from "../../UI/Typography";
import CardForm from "./CardForm";
import ECheckForm from "./ECheckForm";

const PaymentMethodModel = () => (
  <Box>
    <Box display="flex" flexDirection="column">
      <Typography size="big" weight="semibold">
        Add New Payment Method
      </Typography>
      <Typography color="secondarytext">
        Please fill all required fields
      </Typography>
    </Box>
    <Box margin={"32px 0px 0px 0px"}>
      <TabsComponent
        tabs={[
          {
            label: "Credit/Debit Card",
            content: <CardForm />,
          },
          {
            label: "E-Check",
            content: <ECheckForm />,
          },
        ]}
      />
    </Box>
  </Box>
);

export default PaymentMethodModel;
