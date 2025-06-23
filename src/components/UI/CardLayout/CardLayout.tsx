import styles from "./cardLayout.module.css";

export const CardLayout = ({
  children,
  width,
  height,
}: {
  children: React.ReactNode;
  width?: string;
  height?: string;
}) => {
  return (
    <div className={styles.CardLayout} style={{ width, height }}>
      {children}
    </div>
  );
};
