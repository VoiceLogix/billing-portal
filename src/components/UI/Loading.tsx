import { LoadingSVG } from "../SVG/LoadingSVG";
import { Box } from "./Box";

export const Loading: React.FC = () => {
  return (
    <Box
      width="100%"
      height="500px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <LoadingSVG />
    </Box>
  );
};
