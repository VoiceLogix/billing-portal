export const ArrowDownFilled = ({
  onClick,
  rotateUp,
}: {
  onClick?: () => void;
  rotateUp?: boolean;
}) => (
  <svg
    onClick={onClick}
    width="8"
    height="6"
    viewBox="0 0 8 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: `rotate(${rotateUp ? 180 : 0}deg)`,
      transition: "transform 0.2s ease",
      cursor: "pointer",
    }}
  >
    <path
      d="M0.266602 0.400391H7.73327L3.99994 5.20039L0.266602 0.400391Z"
      fill="#333333"
    />
  </svg>
);
