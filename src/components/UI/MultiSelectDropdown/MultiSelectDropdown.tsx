import React, { useState, useRef, useEffect } from "react";
import styles from "./MultiSelectDropdown.module.css";
import { FilterSVG } from "../../SVG/FilterSVG";
import { ArrowDown } from "../../SVG/ArrowDown";

interface MultiSelectDropdownProps {
  items: {
    name: string;
    options: { label: string; value: string }[];
  }[];
  onChange: (selected: string[]) => void;
  selected: string[];
  width?: string;
  icon?: React.ReactNode;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  items,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(() => {
    const initial = {};
    items?.forEach((section) => {
      section.options.forEach((option) => {
        const key = `${section.name.toLowerCase()}-${option.value}`;
        if (option.value.toLowerCase() === "all") {
          initial[key] = true;
        } else if (option.value.toLowerCase() === "escalated") {
          initial[key] = false;
        } else {
          const hasAllOption = section.options.some(
            (opt) => opt.value.toLowerCase() === "all",
          );
          initial[key] = !hasAllOption;
        }
      });
    });
    return initial;
  });

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleFilterChange = (sectionName, optionValue) => {
    const key = `${sectionName.toLowerCase()}-${optionValue}`;
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      const isCurrentlySelected = prev[key];
      const isTogglingOn = !isCurrentlySelected;

      const currentSection = items.find((item) => item.name === sectionName);
      if (!currentSection) return prev;

      const hasAllOption = currentSection.options.some(
        (opt) => opt.value.toLowerCase() === "all",
      );

      if (hasAllOption) {
        const allOptionKey = `${sectionName.toLowerCase()}-all`;

        if (optionValue.toLowerCase() === "all") {
          if (isTogglingOn) {
            currentSection.options.forEach((option) => {
              const optionKey = `${sectionName.toLowerCase()}-${option.value}`;
              if (option.value.toLowerCase() !== "all") {
                newFilters[optionKey] = false;
              }
            });
            newFilters[key] = true;
          } else {
            newFilters[key] = false;
          }
        } else {
          if (isTogglingOn) {
            newFilters[allOptionKey] = false;
            newFilters[key] = true;
          } else {
            newFilters[key] = false;
          }
        }
      } else {
        newFilters[key] = !prev[key];
      }

      const selectedValues = Object.entries(newFilters)
        .filter(([_, isSelected]) => isSelected)
        .map(([filterKey, _]) => filterKey);

      onChange(selectedValues);

      return newFilters;
    });
  };

  return (
    <div>
      <div className={styles.filterContainer} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.filterTrigger}
        >
          <FilterSVG /> Filters
          <span className={styles.chevron}>
            <ArrowDown />
          </span>
        </button>

        {isOpen && (
          <div className={styles.filterDropdown}>
            <div className={styles.filterHeader}>
              <h3 className={styles.filterTitle}>Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className={styles.closeBtn}
              >
                ×
              </button>
            </div>

            <div className={styles.filterContent}>
              {items.map((section) => (
                <div key={section.name} className={styles.filterSection}>
                  <h4 className={styles.sectionTitle}>{section.name}</h4>
                  <div className={styles.optionsContainer}>
                    {section.options.map((option) => {
                      const key = `${section.name.toLowerCase()}-${
                        option.value
                      }`;
                      return (
                        <label
                          key={option.value}
                          className={styles.filterOption}
                        >
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={selectedFilters[key] || false}
                            onChange={() =>
                              handleFilterChange(section.name, option.value)
                            }
                            className={styles.checkbox}
                          />
                          <span className={styles.optionLabel}>
                            {option.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
