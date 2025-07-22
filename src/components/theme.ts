export const theme = {
  colors: {
    white: "#FFFFFF",
    primaryText: "#333333",
    secondaryText: "#6A6A6A",
    blueText: "#0072BCC5",
    blueAccent: "#0088CC",
    lightBlue: "#0072BC",
    errorText: "#C40006",
    redAccent: "#F3000D14",
    warningText: "#D88500",
    gray: "#DFDFDF",
    lightGray: "#F6F6F6",
    neutral: "#60646C",
    bgNeutral: "#0000330F",
    blueBorder: "#0072BC72",
    disabled: "#a9a9a9",
  },
};

export type Color = keyof typeof theme.colors;
