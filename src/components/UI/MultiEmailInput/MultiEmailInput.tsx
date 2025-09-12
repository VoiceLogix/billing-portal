import React, { useState, useRef, useEffect } from "react";
import styles from "./MultiEmailInput.module.css";

interface MultiEmailInputProps {
  emails: string[];
  setEmails: (emails: string[]) => void;
  label: string;
  placeholder?: string;
}

const MultiEmailInput = ({
  emails,
  setEmails,
  label,
  placeholder = "Enter email addresses...",
}: MultiEmailInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setError("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const addEmail = (emailToAdd) => {
    const trimmedEmail = emailToAdd.trim();

    if (!trimmedEmail) return;

    if (!isValidEmail(trimmedEmail)) {
      setError("Please enter a valid email ");
      return;
    }

    if (emails.includes(trimmedEmail)) {
      setError("Duplicate email");
      return;
    }

    const newEmails = [...emails, trimmedEmail];
    setEmails(newEmails);
    setError("");
  };

  const removeEmail = (emailToRemove) => {
    const newEmails = emails.filter((email) => email !== emailToRemove);
    setEmails(newEmails);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Clear error when user starts typing
    if (error) {
      setError("");
    }

    // Handle comma-separated emails
    if (value.includes(",")) {
      const emailsToAdd = value.split(",");
      const lastEmail = emailsToAdd.pop();

      emailsToAdd.forEach((email) => {
        if (email.trim()) {
          addEmail(email);
        }
      });

      setInputValue(lastEmail || "");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEmail(inputValue);
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && emails.length > 0) {
      removeEmail(emails[emails.length - 1]);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const emailsToAdd = pastedText
      .split(/[,;\s]+/)
      .filter((email) => email.trim());

    emailsToAdd.forEach((email) => {
      addEmail(email);
    });

    setInputValue("");
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addEmail(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div
        ref={containerRef}
        className={`${styles.inputWrapper} ${error ? styles.error : ""}`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className={styles.emailList}>
          {emails.map((email, index) => (
            <span key={index} className={styles.emailChip}>
              {email}
              <button
                type="button"
                onClick={() => removeEmail(email)}
                className={styles.removeButton}
                aria-label={`Remove ${email}`}
              >
                ×
              </button>
            </span>
          ))}

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onBlur={handleBlur}
            placeholder={emails.length === 0 ? placeholder : ""}
            className={styles.input}
          />
        </div>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default MultiEmailInput;
