import CardSVG from "../SVG/CardSVG";
import { theme } from "../theme";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";

export const PaymentMethods = () => {
  const name = "Michael Scott";
  const accountNumber = "**** **** ***** 1200";
  return (
    <Box className="layoutWithBorder" width="368px" height="152px">
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box display="flex" flexDirection="column" gap="9px">
          <Typography color="secondarytext">Payment Methods</Typography>
          <Typography weight="medium">{name}</Typography>
          <Typography>{accountNumber}</Typography>
          <Box
            border={`1px solid ${theme.colors.blueText}`}
            borderRadius="4px"
            height="32px"
            width="111px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography color="blueText" weight="medium">
              Replace card
            </Typography>
          </Box>
        </Box>

        <CardSVG />
      </Box>
    </Box>
  );
};
