import styles from "./OrderSummary.module.css";

const OrderSummary = ({ subtotal, tax, total }) => {
  return (
    <div className={`${styles.quoteSummary}`}>
      <div className={styles.container}>
        <div className={styles.row}>
          <span className={styles.label}>Subtotal</span>
          <span className={styles.amount}>{subtotal}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Tax</span>
          <span className={styles.amount}>{tax}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalAmount}>{total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
