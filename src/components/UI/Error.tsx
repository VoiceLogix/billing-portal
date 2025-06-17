import { Box } from "./Box";
import { Typography } from "./Typography";

export const Error: React.FC = () => {
  return (
    <Box
      width="100%"
      height="500px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography color="errorText">Error loading data</Typography>
    </Box>
  );
};
