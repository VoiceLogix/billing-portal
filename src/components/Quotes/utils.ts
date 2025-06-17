import styles from "./QuoteTable.module.css";

export const getStatusClass = (status: string) => {
  let statusLower = status.toLowerCase();
  if (statusLower.includes("cancelled") || statusLower.includes("expired")) {
    return styles["status-cancelled"];
  }
  if (statusLower.includes("active") || statusLower.includes("sent")) {
    return styles["status-active"];
  }
  if (statusLower.includes("pending")) {
    return styles["status-pending"];
  }
  if (statusLower.includes("created")) {
    return styles["status-created"];
  }

  return styles["status-default"];
};
