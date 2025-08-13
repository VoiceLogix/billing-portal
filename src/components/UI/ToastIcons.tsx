import React from "react";

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    style={{ flexShrink: 0 }}
  >
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dy=".3em"
      fontSize="14"
      fill="currentColor"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      i
    </text>
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    style={{ flexShrink: 0 }}
  >
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dy=".3em"
      fontSize="14"
      fill="currentColor"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      !
    </text>
  </svg>
);

export { InfoIcon, ErrorIcon };

