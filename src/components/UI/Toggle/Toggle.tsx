import styles from "./ToggleSwitch.module.css";
import { Box } from "../Box";
import { useId } from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

export default function ToggleSwitch({
  checked,
  onChange,
  label,
}: ToggleSwitchProps) {
  const id = useId();

  return (
    <Box display="flex" alignItems="center" gap="15px">
      <label htmlFor={id} className={styles.switchContainer}>
        <input
          type="checkbox"
          id={id}
          className={styles.hiddenCheckbox}
          checked={checked}
          onChange={onChange}
        />
        <div className={styles.toggleTrack}>
          <span className={styles.toggleKnob} />
        </div>
      </label>

      {label && <span className={styles.label}>{label}</span>}
    </Box>
  );
}
