import React, { useEffect, useRef, useState } from "react";
import { Color, theme } from "../theme";
import { Box } from "./Box";
import { LoadingSVG } from "../SVG/LoadingSVG";

const sizeMap = {
  small: "14px",
  medium: "18px",
} as const;

const paddingMap = {
  small: "6px 12px",
  medium: "12px 12px",
} as const;

const radiusMap = {
  small: "4px",
  medium: "6px",
} as const;

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
  padding?: keyof typeof paddingMap;
  border?: string;
  borderColor?: Color;
  borderSize?: string;
  height?: string;
  color?: Color;
  bgColor?: Color;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  text?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "small",
  weight = "medium",
  color = "white",
  bgColor = "primary",
  radius = "small",
  padding = "small",
  height = "auto",
  border = "none",
  borderColor = "transparent",
  borderSize = "0px",
  onClick,
  disabled = false,
  className = "",
  fullWidth = false,
  text = "",
  isLoading = false,
  type = "button",
}) => {
  const textColor = theme.colors[color];
  const backgroundColor = theme.colors[bgColor];
  const [fixedWidth, setFixedWidth] = useState<number | undefined>(undefined);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hasFixedWidth = useRef(false);

  useEffect(() => {
    if (isLoading && !hasFixedWidth.current && buttonRef.current) {
      const { width } = buttonRef.current.getBoundingClientRect();
      setFixedWidth(width + 50);
      hasFixedWidth.current = true;
    } else if (!isLoading && hasFixedWidth.current) {
      setFixedWidth(undefined);
      hasFixedWidth.current = false;
    }
  }, [isLoading]);

  const getWidth = () => {
    if (fullWidth) return "100%";
    if (isLoading && fixedWidth) return `${fixedWidth}px`;
    return "auto";
  };

  const style: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: sizeMap[size],
    fontWeight: weightMap[weight],
    color: textColor,
    backgroundColor,
    border:
      border !== "none"
        ? border
        : `${borderSize} solid ${theme.colors[borderColor]}`,
    padding: paddingMap[padding],
    borderRadius:
      typeof radius === "number" ? `${radius}px` : radiusMap[radius],
    cursor: disabled || isLoading ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    width: getWidth(),
    minWidth: isLoading && fixedWidth ? `${fixedWidth}px` : "auto",
    lineHeight: 1.2,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    transition: "background-color 0.2s, transform 0.2s",
    height: height,
    position: "relative",
    overflow: "hidden",
  };

  const handleClick = () => {
    if (!disabled && !isLoading && onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      style={style}
      className={className}
      disabled={disabled || isLoading}
      ref={buttonRef}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      type={type}
    >
      {isLoading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ width: "20px", height: "20px" }}
        >
          <LoadingSVG />
        </Box>
      ) : (
        text || children
      )}
    </button>
  );
};
