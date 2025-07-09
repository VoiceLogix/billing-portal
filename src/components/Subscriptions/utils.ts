export const getStatus = (status: string) => {
  if (status.toLowerCase() === "cancel") {
    return "Cancelled";
  }
  return status.toLowerCase();
};
