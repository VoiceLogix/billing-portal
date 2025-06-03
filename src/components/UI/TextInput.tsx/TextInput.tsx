import React from "react";
import { FieldError, UseFormRegister, RegisterOptions } from "react-hook-form";
import styles from "./styles.module.css";

interface TextInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  error?: FieldError;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  register,
  rules,
  type = "text",
  placeholder,
  autoComplete,
  error,
}) => {
  return (
    <div className={styles.textInputContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        {...register(name, rules)}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={styles.textInput}
      />
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default TextInput;
