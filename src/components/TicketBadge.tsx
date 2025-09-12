import React from "react";
import { EmailSVG } from "./SVG/EmailSVG";
import { CommentSVG } from "./SVG/CommentSVG";
import { CheckMarkSVG } from "./SVG/CheckMarkSVG";
import { HighFlagSVG } from "./SVG/HighFlagSVG";
import { LockSVG } from "./SVG/LockSVG";
import { NewSVG } from "./SVG/NewSVG";

export type TicketStatus =
  | "New"
  | "Open"
  | "Responded"
  | "Resolved"
  | "Resolved & Closed"
  | "On-Hold"
  | "Closed";

interface TicketBadgeProps {
  status: string;
  className?: string;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case "New":
      return {
        backgroundColor: "#0047f112",
        textColor: "#002bb7c5",
        icon: <NewSVG />,
      };
    case "Open":
      return {
        backgroundColor: "#0047f112",
        textColor: "#002bb7c5",
        icon: <EmailSVG />,
      };
    case "Responded":
      return {
        backgroundColor: "#0047f112",
        textColor: "#002bb7c5",
        icon: <CommentSVG />,
      };
    case "Resolved":
      return {
        backgroundColor: "#E8F5E8",
        textColor: "#2E7D32",
        icon: <CheckMarkSVG />,
      };
    case "Resolved & Closed":
      return {
        backgroundColor: "#E8F5E8",
        textColor: "#2E7D32",
        icon: <CheckMarkSVG />,
      };
    case "On-Hold":
      return {
        backgroundColor: "#f3000d14",
        textColor: "#c40006",
        icon: <HighFlagSVG />,
      };
    case "Closed":
      return {
        backgroundColor: "#0000330f",
        textColor: "#616161",
        icon: <LockSVG />,
      };
    default:
      return {
        backgroundColor: "#F5F5F5",
        textColor: "#60646c",
        icon: null,
      };
  }
};

export const TicketBadge: React.FC<TicketBadgeProps> = ({
  status,
  className = "",
}) => {
  const config = getStatusConfig(status);

  const badgeStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 8px",
    borderRadius: "3px",
    backgroundColor: config.backgroundColor,
    color: config.textColor,
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "1.2",
    whiteSpace: "nowrap" as const,
  };

  return (
    <span className={className} style={badgeStyle}>
      {config.icon && (
        <span style={{ display: "flex", alignItems: "center" }}>
          {config.icon}
        </span>
      )}
      <span>{status}</span>
    </span>
  );
};

export default TicketBadge;
