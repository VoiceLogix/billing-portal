import React from "react";
import { Color, theme } from "../theme";

const sizeMap = {
  small: "14px",
  medium: "16px",
  large: "20px",
} as const;

const weightMap = {
  normal: 400,
  medium: 500,
} as const;

interface TypographyProps {
  children?: React.ReactNode;
  size?: keyof typeof sizeMap;
  weight?: keyof typeof weightMap;
  color?: Color;
  align?: "left" | "center" | "right";
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  size = "small",
  weight = "normal",
  color = "primarytext",
  align = "left",
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
    <span style={{ ...defaultStyle }} className={className}>
      {children}
    </span>
  );
};
