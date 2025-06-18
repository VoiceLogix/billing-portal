import React from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
  status: string;
}

const getStatusClass = (status: string) => {
  if (!status) return styles["status-default"];

  const statusLower = status.toLowerCase();

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

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const className = `${styles["status-badge"]} ${getStatusClass(status)}`;
  return <span className={className}>{status}</span>;
};
