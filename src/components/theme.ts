export const theme = {
  colors: {
    white: "#FFFFFF",
    primaryText: "#333333",
    secondaryText: "#6A6A6A",
    blueText: "#0072BCC5",
    blueAccent: "#0088CC",
    lightBlue: "#0072BC",
    errorText: "#C40006",
    warningText: "#D88500",
    gray: "#DFDFDF",
    lightGray: "#F1F1F1",
    neutral: "#60646C",
    bgNeutral: "#0000330F",
    blueBorder: "#0072BC72",
  },
};

export type Color = keyof typeof theme.colors;
