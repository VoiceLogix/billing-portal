export const theme = {
  colors: {
    white: "#FFFFFF",
    primarytext: "#333333",
    secondarytext: "#6A6A6A",
    blueText: "#0072BCC5",
    blueAccent: "#0088CC",
    lightBlue: "#0072BC",
    errorText: "#C40006",
    warningText: "#D88500",
    gray: "#DFDFDF",
    lightGray: "#F1F1F1",
    neutral: "#60646C",
    bgNeutral: "#0000330F",
  },
};

export type Color = keyof typeof theme.colors;
