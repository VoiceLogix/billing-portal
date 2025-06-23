import { Box } from "../Box";
import { Typography } from "../Typography";
import styles from "./radioSelect.module.css";

export const RadioSelect = ({
  label,
  checked,
}: {
  label: string;
  checked: boolean;
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap="8px"
      className={styles.radioSelect}
    >
      <input type="radio" checked={checked} />
      <Typography size="small">{label}</Typography>
    </Box>
  );
};
