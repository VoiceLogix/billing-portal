export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  height?: string | number;
  padding?: string | number;
  margin?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  border?: string;
  borderBottom?: string;
  borderRadius?: string | number;
  bgColor?: string;
  display?: "block" | "flex";
  flexDirection?: React.CSSProperties["flexDirection"];
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  flexWrap?: React.CSSProperties["flexWrap"];
  gap?: string | number;
  style?: React.CSSProperties;
}

export const Box: React.FC<BoxProps> = ({
  children,
  width,
  minWidth,
  maxWidth,
  height,
  padding,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  bgColor,
  border,
  borderBottom,
  borderRadius,
  display = "block",
  flexDirection,
  justifyContent,
  alignItems,
  flexWrap,
  gap,
  style,
  className = "",
  ...rest
}) => {
  const boxStyle: React.CSSProperties = {
    display,
    width,
    minWidth,
    maxWidth,
    height,
    padding,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    border,
    borderRadius,
    borderBottom,
    backgroundColor: bgColor,
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap,
    gap,
    boxSizing: "border-box",
    ...style,
  };

  return (
    <div className={className} style={boxStyle} {...rest}>
      {children}
    </div>
  );
};
