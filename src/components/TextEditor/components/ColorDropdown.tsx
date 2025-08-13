import React, { useRef, useState, useEffect } from "react";
import { Pen, ChevronDown } from "lucide-react";
import { colorPalette } from "../utils";
import styles from "../TextEditor.module.css";

interface ColorDropdownProps {
  currentColor: string;
  onSelectColor: (color: string) => void;
}

export function ColorDropdown({
  currentColor,
  onSelectColor,
}: ColorDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState(currentColor);
  const handleColorSelect = (color: string) => {
    onSelectColor(color);
    setSelectedColor(color);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.colorDropdown} ref={dropdownRef}>
      <button
        type="button"
        className={styles.colorButton}
        onClick={() => setIsOpen(!isOpen)}
        title="Text Color"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <Pen
            size={14}
            color={selectedColor === "#ffffff" ? "#000000" : selectedColor}
            style={{
              marginRight: "4px",
              fill: selectedColor,
            }}
          />
          <ChevronDown size={12} />
        </div>
      </button>

      {isOpen && (
        <div className={styles.colorDropdownContent}>
          <div className={styles.colorGrid}>
            {colorPalette.map((color) => (
              <div
                key={color}
                className={styles.colorSwatch}
                style={{
                  backgroundColor: color,
                  border:
                    color === "#ffffff"
                      ? "2px solid #d1d5db"
                      : color === selectedColor
                      ? "2px solid #3b82f6"
                      : "2px solid transparent",
                }}
                onClick={() => handleColorSelect(color)}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
