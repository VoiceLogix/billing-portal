import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./dropdown.module.css";
import { ArrowDown } from "../../SVG/ArrowDown";
import { Box } from "../Box";
import { Typography } from "../Typography";
import { FieldError } from "react-hook-form";

interface DropdownProps {
  value: string;
  label?: string | React.ReactNode;
  items: string[];
  icon?: React.ReactNode;
  width?: string;
  withBackground?: boolean;
  onChange: (item: string) => void;
  error?: FieldError;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  label,
  items,
  width = "100%",
  icon,
  withBackground = true,
  onChange,
  error,
  disabled = false,
}) => {
  return (
    <Box width={width}>
      {label && (
        <Box marginBottom="8px">
          <Typography weight="semibold">{label}</Typography>
        </Box>
      )}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className={styles.trigger}
            style={{
              width,
              background: withBackground
                ? "var(--color-light-gray)"
                : "transparent",
            }}
            disabled={disabled}
          >
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.labelText}>{value}</span>
            <span className={styles.chevron}>
              <ArrowDown />
            </span>
          </button>
        </DropdownMenu.Trigger>
        {!disabled && (
          <DropdownMenu.Content
            sideOffset={4}
            align="start"
            className={styles.content}
            style={{ width }}
          >
            {items.length === 0 ? (
              <DropdownMenu.Item
                key={0}
                onSelect={() => onChange("")}
                className={styles.item}
                disabled
              >
                No options
              </DropdownMenu.Item>
            ) : (
              items.map((item, idx) => (
                <DropdownMenu.Item
                  key={idx}
                  onSelect={() => onChange(item)}
                  className={styles.item}
                  aria-selected={value === item}
                >
                  {item}
                </DropdownMenu.Item>
              ))
            )}
          </DropdownMenu.Content>
        )}
      </DropdownMenu.Root>
      {error && <Typography color="errorText">{error.message}</Typography>}
    </Box>
  );
};

export default Dropdown;
