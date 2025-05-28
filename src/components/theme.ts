export const theme = {
  colors: {
    primarytext: "#333333",
    secondarytext: "#6A6A6A",
    blueText: "#0072BCC5",
    errorText: "#C40006",
    warningText: "#D88500",
  },
};

export type Color = keyof typeof theme.colors;
