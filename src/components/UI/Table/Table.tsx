import React, { useState, useMemo } from "react";
import styles from "./Table.module.css";
import { ArrowDownFilled } from "../../SVG/ArrowDownFilled";

const isDate = (value: unknown): value is Date => {
  return value instanceof Date;
};

export interface Column<T> {
  header: string;
  accessor: keyof T | "";
  align?: "left" | "center" | "right";
  sortable?: boolean;
  isLink?: boolean;
  width?: string;
  minWidth?: string;
  searchable?: boolean;
  Cell?: (value: T[keyof T], row: T) => React.ReactNode;
  key?: string;
}

export interface TableProps<T extends Record<string, any>> {
  columns: Column<T>[];
  data: T[];
  searchTerm?: string;
  defaultSortKey?: keyof T;
  defaultSortOrder?: "asc" | "desc";
  onSort?: (key: keyof T) => void;
  className?: string;
  emptyText?: string;
  headerBackground?: boolean;
  showScroll?: boolean;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  searchTerm = "",
  emptyText = "No data available",
  defaultSortKey,
  defaultSortOrder = "asc",
  onSort,
  className = "",
  headerBackground = false,
  showScroll = false,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | undefined>(defaultSortKey);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(defaultSortOrder);

  const getColumnKey = (col: Column<T>, index: number): string => {
    if (col.key) return col.key;
    if (col.accessor && col.accessor !== "") return String(col.accessor);
    return `column-${index}`;
  };

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return data;

    return data.filter((row) => {
      return columns.some((col) => {
        if (col.searchable === false) return false;
        if (!col.accessor || col.accessor === "") return false; // Skip custom columns in search

        const value = row[col.accessor];
        if (value == null) return false;

        let searchableText: string;
        if (typeof value === "number") {
          if (col.Cell) {
            try {
              const formatted = col.Cell(value, row);
              if (typeof formatted === "string") {
                searchableText = formatted.toLowerCase();
              } else {
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                  searchableText = date
                    .toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })
                    .toLowerCase();
                } else {
                  searchableText = value.toString();
                }
              }
            } catch {
              searchableText = value.toString();
            }
          } else {
            searchableText = value.toString();
          }
        } else if (isDate(value)) {
          searchableText = value
            .toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })
            .toLowerCase();
        } else {
          searchableText = value.toString().toLowerCase();
        }

        return searchableText.includes(term);
      });
    });
  }, [data, searchTerm, columns]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    const arr = [...filteredData];
    arr.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sortOrder === "asc" ? -1 : 1;
      if (bVal == null) return sortOrder === "asc" ? 1 : -1;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (isDate(aVal) && isDate(bVal)) {
        return sortOrder === "asc"
          ? aVal.getTime() - bVal.getTime()
          : bVal.getTime() - aVal.getTime();
      }

      const as = aVal.toString().toLowerCase();
      const bs = bVal.toString().toLowerCase();
      return sortOrder === "asc" ? as.localeCompare(bs) : bs.localeCompare(as);
    });

    return arr;
  }, [filteredData, sortKey, sortOrder]);

  const handleSort = (key: keyof T) => {
    setSortKey((prev) => {
      if (prev === key) {
        setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
        return key;
      }
      setSortOrder("asc");
      return key;
    });

    if (onSort) {
      onSort(key);
    }
  };

  return (
    <div
      className={` ${styles.tableWrapper} ${className}  ${
        showScroll ? "always-show-scrollbar" : ""
      }`}
    >
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, index) => {
              const isSorted = sortKey === col.accessor;
              const headerClass = [
                styles.th,
                headerBackground ? styles.headerBackground : "",
                col.align === "right" ? styles.alignRight : "",
                col.align === "center" ? styles.alignCenter : "",
              ].join(" ");
              const columnKey = getColumnKey(col, index);
              const headerStyle: React.CSSProperties = {};
              if (col.width) headerStyle.width = col.width;
              if (col.minWidth) headerStyle.minWidth = col.minWidth;
              return (
                <th
                  key={columnKey}
                  className={headerClass}
                  style={headerStyle}
                  onClick={
                    col.sortable && col.accessor && col.accessor !== ""
                      ? () => handleSort(col.accessor as keyof T)
                      : undefined
                  }
                >
                  <div className={styles.headerContent}>
                    <span className={styles.headerText}>{col.header}</span>
                    {col.sortable && col.accessor && col.accessor !== "" && (
                      <ArrowDownFilled
                        rotateUp={isSorted && sortOrder === "asc"}
                      />
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col, colIndex) => {
                  const raw =
                    col.accessor && col.accessor !== ""
                      ? row[col.accessor]
                      : undefined;
                  const text = raw == null ? "" : String(raw);
                  const cellNode = col.Cell ? col.Cell(raw, row) : text;
                  const content = col.isLink ? (
                    <span className={styles.link}>{cellNode}</span>
                  ) : (
                    cellNode
                  );
                  const cellClass = [
                    styles.td,
                    col.align === "right" ? styles.alignRight : "",
                    col.align === "center" ? styles.alignCenter : "",
                  ].join(" ");
                  const columnKey = getColumnKey(col, colIndex);
                  const cellStyle: React.CSSProperties = {};
                  if (col.width) cellStyle.width = col.width;
                  if (col.minWidth) cellStyle.minWidth = col.minWidth;
                  return (
                    <td style={cellStyle} key={columnKey} className={cellClass}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>{emptyText}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
