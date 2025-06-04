import React from "react";
import { FieldError, UseFormRegister, RegisterOptions } from "react-hook-form";
import styles from "./styles.module.css";
import { SearchSVG } from "../../SVG/SearchSVG";

interface SearchInputProps {
  name: string;
  placeholder?: string;
  width?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  name,
  placeholder,
  width,
  onChange,
  value,
}) => {
  return (
    <div className={styles.searchInputContainer}>
      <div className={styles.searchIcon}>
        <SearchSVG />
      </div>
      <input
        value={value}
        onChange={onChange}
        id={name}
        type="text"
        placeholder={placeholder}
        className={styles.searchInput}
        style={{ width: width || "100%" }}
      />
    </div>
  );
};

export default SearchInput;
