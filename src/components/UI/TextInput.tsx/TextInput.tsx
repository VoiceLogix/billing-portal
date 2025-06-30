import React from "react";
import { FieldError, UseFormRegister, RegisterOptions } from "react-hook-form";
import styles from "./styles.module.css";

interface TextInputProps {
  label: string;
  name: string;
  register?: UseFormRegister<any>;
  rules?: RegisterOptions;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: FieldError;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  register,
  rules,
  error,
  ...rest
}) => {
  return (
    <div className={styles.textInputContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        {...(register && register(name, rules))}
        className={styles.textInput}
        {...rest}
      />
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default TextInput;
