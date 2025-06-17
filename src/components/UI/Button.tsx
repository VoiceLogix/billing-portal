import React from "react";
import { Color, theme } from "../theme";

const sizeMap = {
  small: "14px",
  medium: "18px",
} as const;

const paddingMap = {
  small: "6px 12px",
  medium: "8px 16px",
} as const;

const radiusMap = {
  small: "4px",
  medium: "6px",
};

const weightMap = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

interface ButtonProps {
  children?: React.ReactNode;
  size?: keyof typeof sizeMap;
  weight?: keyof typeof weightMap;
  radius?: keyof typeof radiusMap | number;
  color?: Color;
  bgColor?: Color;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  text?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "small",
  weight = "medium",
  color = "white",
  bgColor = "primary",
  radius = "small",
  onClick,
  disabled = false,
  className = "",
  fullWidth = false,
  text = "",
}) => {
  const textColor = theme.colors[color];
  const backgroundColor = theme.colors[bgColor];

  const style: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: sizeMap[size],
    fontWeight: weightMap[weight],
    color: textColor,
    backgroundColor,
    border: "none",
    padding: paddingMap[size],
    borderRadius: typeof radius === "number" ? `${radius}px` : radius,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? "100%" : "auto",
    lineHeight: 1.2,
    display: "inline-block",
    textAlign: "center",
    transition: "background-color 0.2s, transform 0.2s",
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={style}
      className={className}
      disabled={disabled}
    >
      {text || children}
    </button>
  );
};
