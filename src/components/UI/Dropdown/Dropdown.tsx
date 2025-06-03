import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./dropdown.module.css";
import { ArrowDown } from "../../SVG/ArrowDown";

interface DropdownItem {
  label: string;
  onSelect: () => void;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, items }) => {
  return (
    <DropdownMenu.Root>
      {/* Trigger Button styled like an input */}
      <DropdownMenu.Trigger asChild>
        <button className={styles.trigger}>
          <span className={styles.labelText}>{label}</span>
          <span className={styles.chevron}>
            <ArrowDown />
          </span>
        </button>
      </DropdownMenu.Trigger>

      {/* Dropdown Content */}
      <DropdownMenu.Content
        sideOffset={4}
        align="start"
        className={styles.content}
      >
        {items.map((item, index) => (
          <DropdownMenu.Item
            key={index}
            onSelect={item.onSelect}
            className={styles.item}
          >
            {item.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
