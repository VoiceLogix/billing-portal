import { Box } from "./Box";
import { Typography } from "./Typography";

export const Error = ({
  message = "Error loading data",
}: {
  message?: string;
}) => {
  return (
    <Box
      width="100%"
      height="500px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography color="errorText">{message}</Typography>
    </Box>
  );
};
