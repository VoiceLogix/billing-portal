import { Box } from "../Box";
import { Typography } from "../Typography";
import styles from "./radioSelect.module.css";

export const RadioSelect = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange?: () => void;
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap="8px"
      className={styles.radioSelect}
    >
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        readOnly={onChange === undefined}
      />
      <Typography size="small">{label}</Typography>
    </Box>
  );
};
