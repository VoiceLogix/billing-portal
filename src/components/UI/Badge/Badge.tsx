import React from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
  status: string;
  color?:
    | "default"
    | "cancelled"
    | "active"
    | "pending"
    | "created"
    | "primary";
}

const getStatusClass = (status: string) => {
  if (!status) return styles["status-default"];

  const statusLower = status.toLowerCase();

  if (statusLower.includes("primary")) {
    return styles["status-primary"];
  }
  if (statusLower.includes("cancelled") || statusLower.includes("expired")) {
    return styles["status-cancelled"];
  }
  if (
    statusLower.includes("active") ||
    statusLower.includes("sent") ||
    statusLower.includes("fulfilled") ||
    statusLower.includes("paid")
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

export const Badge: React.FC<BadgeProps> = ({ status, color }) => {
  const className = `${styles["status-badge"]} ${getStatusClass(
    color || status,
  )}`;
  return <span className={className}>{status}</span>;
};
