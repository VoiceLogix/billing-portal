import React, { useState } from "react";
import styles from "./QuoteTable.module.css";
import { ArrowDownFilled } from "../SVG/ArrowDownFilled";

interface Quote {
  id: string;
  type: string;
  activationDate: string;
  totalAmount: number;
  tax: number;
  status: string;
}

const QuoteTable: React.FC = () => {
  const [quotes] = useState<Quote[]>([
    {
      id: "QU1002",
      type: "New",
      activationDate: "May 1, 2025",
      totalAmount: 560.4,
      tax: 31.5,
      status: "Cancelled",
    },
    {
      id: "QU1003",
      type: "New",
      activationDate: "May 1, 2025",
      totalAmount: 105.34,
      tax: 34.22,
      status: "Cancelled",
    },
    {
      id: "QU1005",
      type: "In Progress",
      activationDate: "May 1, 2025",
      totalAmount: 105.34,
      tax: 34.22,
      status: "Active",
    },
  ]);

  const getStatusClass = (status: string): string => {
    switch (status.toLowerCase()) {
      case "cancelled":
        return styles["status-cancelled"];
      case "active":
        return styles["status-active"];
      default:
        return styles["status-default"];
    }
  };

  return (
    <div className={styles["quote-table-container"]}>
      <table className={styles["quote-table"]}>
        <thead>
          <tr>
            <th className={styles.sortable}>
              <div className={styles["header-content"]}>
                Quote number
                <ArrowDownFilled />
              </div>
            </th>
            <th className={styles.sortable}>
              <div className={styles["header-content"]}>
                Quote type
                <ArrowDownFilled />
              </div>
            </th>
            <th className={styles.sortable}>
              <div className={styles["header-content"]}>
                Activation date
                <ArrowDownFilled />
              </div>
            </th>
            <th className={styles.sortable}>
              <div className={styles["header-content"]}>
                Total amount
                <ArrowDownFilled />
              </div>
            </th>
            <th className={styles.sortable}>
              <div className={styles["header-content"]}>
                Tax
                <ArrowDownFilled />
              </div>
            </th>
            <th className={styles.sortable}>
              <div className={styles["header-content"]}>
                Status
                <ArrowDownFilled />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote.id}>
              <td>
                <a href="#" className={styles["quote-link"]}>
                  {quote.id}
                </a>
              </td>
              <td>{quote.type}</td>
              <td>{quote.activationDate}</td>
              <td>${quote.totalAmount.toFixed(2)}</td>
              <td>${quote.tax.toFixed(2)}</td>
              <td>
                <span
                  className={`${styles["status-badge"]} ${getStatusClass(
                    quote.status,
                  )}`}
                >
                  {quote.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuoteTable;
