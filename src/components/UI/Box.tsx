import React, { JSX } from "react";
import { Color, theme } from "../theme";

// Spacing scale for consistent spacing
type SpacingValue = string | number | "auto";
type BorderValue = string | "none";

export interface BoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  // Layout
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;

  // Dimensions
  width?: SpacingValue;
  minWidth?: SpacingValue;
  maxWidth?: SpacingValue;
  height?: SpacingValue;
  minHeight?: SpacingValue;
  maxHeight?: SpacingValue;

  // Spacing - Margin
  margin?: SpacingValue;
  marginTop?: SpacingValue;
  marginBottom?: SpacingValue;
  marginLeft?: SpacingValue;
  marginRight?: SpacingValue;
  marginX?: SpacingValue; // horizontal margin
  marginY?: SpacingValue; // vertical margin

  // Spacing - Padding
  padding?: SpacingValue;
  paddingTop?: SpacingValue;
  paddingBottom?: SpacingValue;
  paddingLeft?: SpacingValue;
  paddingRight?: SpacingValue;
  paddingX?: SpacingValue; // horizontal padding
  paddingY?: SpacingValue; // vertical padding

  // Border
  border?: BorderValue;
  borderTop?: BorderValue;
  borderBottom?: BorderValue;
  borderLeft?: BorderValue;
  borderRight?: BorderValue;
  borderColor?: Color;
  borderTopColor?: Color;
  borderBottomColor?: Color;
  borderLeftColor?: Color;
  borderRightColor?: Color;
  borderRadius?: SpacingValue;
  borderTopLeftRadius?: SpacingValue;
  borderTopRightRadius?: SpacingValue;
  borderBottomLeftRadius?: SpacingValue;
  borderBottomRightRadius?: SpacingValue;
  borderWidth?: SpacingValue;
  borderStyle?: React.CSSProperties["borderStyle"];

  // Background & Colors
  bgColor?: Color;
  backgroundColor?: Color; // alias for bgColor
  color?: Color;

  // Display & Layout
  display?: React.CSSProperties["display"];
  position?: React.CSSProperties["position"];
  top?: SpacingValue;
  bottom?: SpacingValue;
  left?: SpacingValue;
  right?: SpacingValue;
  zIndex?: number;

  // Flexbox
  flexDirection?: React.CSSProperties["flexDirection"];
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  alignContent?: React.CSSProperties["alignContent"];
  alignSelf?: React.CSSProperties["alignSelf"];
  flexWrap?: React.CSSProperties["flexWrap"];
  flex?: React.CSSProperties["flex"];
  flexGrow?: React.CSSProperties["flexGrow"];
  flexShrink?: React.CSSProperties["flexShrink"];
  flexBasis?: React.CSSProperties["flexBasis"];
  gap?: SpacingValue;
  rowGap?: SpacingValue;
  columnGap?: SpacingValue;

  // Typography
  textAlign?: React.CSSProperties["textAlign"];
  fontSize?: SpacingValue;
  fontWeight?: React.CSSProperties["fontWeight"];
  lineHeight?: React.CSSProperties["lineHeight"];
  letterSpacing?: React.CSSProperties["letterSpacing"];

  // Visual
  opacity?: number;
  visibility?: React.CSSProperties["visibility"];
  overflow?: React.CSSProperties["overflow"];
  overflowX?: React.CSSProperties["overflowX"];
  overflowY?: React.CSSProperties["overflowY"];
  boxShadow?: string;
  transform?: string;
  transition?: string;

  // Interaction
  cursor?: React.CSSProperties["cursor"];
  pointerEvents?: React.CSSProperties["pointerEvents"];
  userSelect?: React.CSSProperties["userSelect"];

  // Custom styles override
  style?: React.CSSProperties;
}

// Utility functions
const getColorValue = (color: Color | undefined): string | undefined => {
  return color ? theme.colors[color] : undefined;
};

const normalizeSpacing = (
  value: SpacingValue | undefined,
): string | number | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === "number") return `${value}px`;
  return value;
};

export const Box: React.FC<BoxProps> = ({
  children,
  as: Component = "div",

  // Dimensions
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,

  // Spacing - Margin
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginX,
  marginY,

  // Spacing - Padding
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingX,
  paddingY,

  // Border
  border,
  borderTop,
  borderBottom,
  borderLeft,
  borderRight,
  borderColor,
  borderTopColor,
  borderBottomColor,
  borderLeftColor,
  borderRightColor,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderWidth,
  borderStyle,

  // Background & Colors
  bgColor,
  backgroundColor,
  color,

  // Display & Layout
  display = "block",
  position,
  top,
  bottom,
  left,
  right,
  zIndex,

  // Flexbox
  flexDirection,
  justifyContent,
  alignItems,
  alignContent,
  alignSelf,
  flexWrap,
  flex,
  flexGrow,
  flexShrink,
  flexBasis,
  gap,
  rowGap,
  columnGap,

  // Typography
  textAlign,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,

  // Visual
  opacity,
  visibility,
  overflow,
  overflowX,
  overflowY,
  boxShadow,
  transform,
  transition,

  // Interaction
  cursor,
  pointerEvents,
  userSelect,

  // Standard HTML props
  style,
  className = "",
  ...rest
}) => {
  const boxStyle: React.CSSProperties = {
    // Display & Layout
    display,
    position,
    top: normalizeSpacing(top),
    bottom: normalizeSpacing(bottom),
    left: normalizeSpacing(left),
    right: normalizeSpacing(right),
    zIndex,

    // Dimensions
    width: normalizeSpacing(width),
    minWidth: normalizeSpacing(minWidth),
    maxWidth: normalizeSpacing(maxWidth),
    height: normalizeSpacing(height),
    minHeight: normalizeSpacing(minHeight),
    maxHeight: normalizeSpacing(maxHeight),

    // Spacing - Margin (with X/Y support)
    margin: normalizeSpacing(margin),
    marginTop: normalizeSpacing(marginTop || marginY),
    marginBottom: normalizeSpacing(marginBottom || marginY),
    marginLeft: normalizeSpacing(marginLeft || marginX),
    marginRight: normalizeSpacing(marginRight || marginX),

    // Spacing - Padding (with X/Y support)
    padding: normalizeSpacing(padding),
    paddingTop: normalizeSpacing(paddingTop || paddingY),
    paddingBottom: normalizeSpacing(paddingBottom || paddingY),
    paddingLeft: normalizeSpacing(paddingLeft || paddingX),
    paddingRight: normalizeSpacing(paddingRight || paddingX),

    // Border - simplified logic
    border:
      border && borderColor ? `${border} ${theme.colors[borderColor]}` : border,
    borderTop:
      borderTop && (borderTopColor || borderColor)
        ? `${borderTop} ${theme.colors[borderTopColor || borderColor]}`
        : borderTop,
    borderBottom:
      borderBottom && (borderBottomColor || borderColor)
        ? `${borderBottom} ${theme.colors[borderBottomColor || borderColor]}`
        : borderBottom,
    borderLeft:
      borderLeft && (borderLeftColor || borderColor)
        ? `${borderLeft} ${theme.colors[borderLeftColor || borderColor]}`
        : borderLeft,
    borderRight:
      borderRight && (borderRightColor || borderColor)
        ? `${borderRight} ${theme.colors[borderRightColor || borderColor]}`
        : borderRight,
    borderWidth: normalizeSpacing(borderWidth),
    borderStyle,

    // Border Radius
    borderRadius: normalizeSpacing(borderRadius),
    borderTopLeftRadius: normalizeSpacing(borderTopLeftRadius),
    borderTopRightRadius: normalizeSpacing(borderTopRightRadius),
    borderBottomLeftRadius: normalizeSpacing(borderBottomLeftRadius),
    borderBottomRightRadius: normalizeSpacing(borderBottomRightRadius),

    // Background & Colors
    backgroundColor: getColorValue(backgroundColor || bgColor),
    color: getColorValue(color),

    // Flexbox
    flexDirection,
    justifyContent,
    alignItems,
    alignContent,
    alignSelf,
    flexWrap,
    flex,
    flexGrow,
    flexShrink,
    flexBasis: normalizeSpacing(flexBasis),
    gap: normalizeSpacing(gap),
    rowGap: normalizeSpacing(rowGap),
    columnGap: normalizeSpacing(columnGap),

    // Typography
    textAlign,
    fontSize: normalizeSpacing(fontSize),
    fontWeight,
    lineHeight,
    letterSpacing,

    // Visual
    opacity,
    visibility,
    overflow,
    overflowX,
    overflowY,
    boxShadow,
    transform,
    transition,

    // Interaction
    cursor,
    pointerEvents,
    userSelect,

    // Box model
    boxSizing: "border-box",

    // Override with custom styles
    ...style,
  };

  // Remove undefined values to keep DOM clean
  Object.keys(boxStyle).forEach((key) => {
    if (boxStyle[key as keyof React.CSSProperties] === undefined) {
      delete boxStyle[key as keyof React.CSSProperties];
    }
  });

  const Element = Component as React.ElementType;

  return (
    <Element className={className} style={boxStyle} {...rest}>
      {children}
    </Element>
  );
};

// Create compound components
const BoxFlex: React.FC<Omit<BoxProps, "display">> = (props) => (
  <Box {...props} display="flex" />
);

const BoxInline: React.FC<Omit<BoxProps, "display">> = (props) => (
  <Box {...props} display="inline-block" />
);

// Attach compound components to Box
(Box as any).Flex = BoxFlex;
(Box as any).Inline = BoxInline;

// Create a properly typed Box component with compound components
interface BoxComponent extends React.FC<BoxProps> {
  Flex: React.FC<Omit<BoxProps, "display">>;
  Inline: React.FC<Omit<BoxProps, "display">>;
}

// Export Box with proper typing as default
export { Box as default };

// Also export compound version for explicit usage
export const BoxWithCompounds = Box as BoxComponent;

// Common layout patterns
export const Flex = (props: Omit<BoxProps, "display">) => (
  <Box display="flex" {...props} />
);

export const Stack = ({
  direction = "column",
  spacing,
  ...props
}: Omit<BoxProps, "display" | "flexDirection" | "gap"> & {
  direction?: "row" | "column";
  spacing?: SpacingValue;
}) => <Box display="flex" flexDirection={direction} gap={spacing} {...props} />;

export const HStack = (props: Omit<BoxProps, "display" | "flexDirection">) => (
  <Box display="flex" flexDirection="row" {...props} />
);

export const VStack = (props: Omit<BoxProps, "display" | "flexDirection">) => (
  <Box display="flex" flexDirection="column" {...props} />
);

// Center content helper
export const Center = (
  props: Omit<BoxProps, "display" | "alignItems" | "justifyContent">,
) => (
  <Box display="flex" alignItems="center" justifyContent="center" {...props} />
);

// Spacer component
export const Spacer = ({
  size = "auto",
  direction = "horizontal",
}: {
  size?: SpacingValue;
  direction?: "horizontal" | "vertical";
}) => (
  <Box
    width={direction === "horizontal" ? size : undefined}
    height={direction === "vertical" ? size : undefined}
    flex={size === "auto" ? 1 : undefined}
  />
);

// Divider component
export const Divider = ({
  orientation = "horizontal",
  color = "border",
  thickness = "1px",
  ...props
}: Omit<BoxProps, "border" | "width" | "height"> & {
  orientation?: "horizontal" | "vertical";
  color?: Color;
  thickness?: string;
}) => (
  <Box
    {...props}
    width={orientation === "horizontal" ? "100%" : thickness}
    height={orientation === "vertical" ? "100%" : thickness}
    backgroundColor={color}
  />
);
