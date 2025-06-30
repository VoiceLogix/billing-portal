import React from "react";
import { Color, theme } from "../theme";

const sizeMap = {
  xSmall: "12px",
  small: "14px",
  medium: "16px",
  big: "18px",
  large: "20px",
} as const;

const weightMap = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
} as const;

interface TypographyProps {
  children?: React.ReactNode;
  size?: keyof typeof sizeMap;
  weight?: keyof typeof weightMap;
  color?: Color;
  align?: "left" | "center" | "right";
  className?: string;
  onClick?: () => void;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  size = "small",
  weight = "normal",
  color = "primaryText",
  align = "left",
  onClick,
  className = "",
}) => {
  const textColor = theme.colors[color];
  const defaultStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: sizeMap[size],
    fontWeight: weightMap[weight],
    color: textColor,
    textAlign: align,
    lineHeight: 1.5,
  };

  return (
    <span onClick={onClick} style={{ ...defaultStyle }} className={className}>
      {children}
    </span>
  );
};
