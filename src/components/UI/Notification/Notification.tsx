import { useEffect, useState } from "react";
import { InfoSvg } from "../../SVG/InfoSvg";
import styles from "./notification.module.css";

export const Notification = ({
  type,
  message,
  showNotification,
}: {
  type: "success" | "error";
  message: string;
  showNotification: boolean;
}) => {
  const [show, setShow] = useState(showNotification);

  useEffect(() => {
    if (showNotification) {
      setShow(true);
    } else {
      setTimeout(() => {
        setShow(false);
      }, 10000);
    }
  }, [showNotification]);

  return (
    <div
      style={{ visibility: show ? "visible" : "hidden" }}
      className={styles[`notification-${type}`]}
    >
      <InfoSvg type={type} />
      <div>{message}</div>
    </div>
  );
};
