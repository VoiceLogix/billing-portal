import styles from "./BillingTable.module.css";

export const getStatusClass = (status: string) => {
  console.log("getStatusClass called with status:", status);

  if (!status) return styles["status-default"];

  let statusLower = status.toLowerCase();
  if (statusLower.includes("cancelled") || statusLower.includes("expired")) {
    return styles["status-cancelled"];
  }
  if (
    statusLower.includes("active") ||
    statusLower.includes("sent") ||
    statusLower.includes("fulfilled")
  ) {
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
