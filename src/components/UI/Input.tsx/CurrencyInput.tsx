import styles from "./CurrencyInput.module.css";

const CurrencyInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <div className={styles.container}>
        <span className={styles.dollar}>$</span>
        <input
          type="number"
          value={value}
          onChange={onChange}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
