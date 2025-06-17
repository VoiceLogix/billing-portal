import React, { useState, useMemo } from "react";
import styles from "./BillingTable.module.css";
import { ArrowDownFilled } from "../SVG/ArrowDownFilled";
import {
  ClientOrderInfo,
  QuoteListingInterface,
} from "../../types/QuoteListingInterface";
import { formatDate } from "../../utils/formatDate";
import { formatToUSD } from "../../utils/formatToUSD";
import { getStatusClass } from "./utils";
import { BillingType } from "./BillingListing";

type SortKey = keyof Pick<
  ClientOrderInfo,
  | "orderNumber"
  | "createdDate"
  | "orderAmount"
  | "taxAmount"
  | "stateString"
  | "orderStatus"
>;
type SortOrder = "asc" | "desc";

interface BillingTableProps {
  searchTerm: string;
  billingListing: QuoteListingInterface;
  setSelectedId: (id: string | null) => void;
  type: BillingType;
}

const BillingTable: React.FC<BillingTableProps> = ({
  searchTerm,
  billingListing,
  setSelectedId,
}) => {
  const [sortKey, setSortKey] = useState<SortKey>("orderNumber");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [orders] = useState(billingListing.clientOrderInfoList);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return orders;

    return orders.filter(
      ({
        orderStatus,
        orderNumber,
        taxAmount,
        orderAmount,
        createdDate,
        stateString,
      }) => {
        return (
          orderNumber.toLowerCase().includes(term) ||
          orderStatus.toLowerCase().includes(term) ||
          orderAmount.toString().includes(term) ||
          taxAmount.toString().includes(term) ||
          stateString?.toLowerCase()?.includes(term) ||
          new Date(createdDate)
            .toLocaleDateString()
            .toLowerCase()
            .includes(term)
        );
      },
    );
  }, [searchTerm, orders]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return sortOrder === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [filtered, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    setSortKey(key);
    setSortOrder((prev) =>
      prev === "asc" && key === sortKey ? "desc" : "asc",
    );
  };

  const handleQuoteClick = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div className={styles["quote-table-container"]}>
      <table className={styles["quote-table"]}>
        <thead>
          <tr>
            {(
              [
                "orderNumber",
                "orderStatus",
                "createdDate",
                "orderAmount",
                "taxAmount",
                "stateString",
              ] as SortKey[]
            ).map((key) => (
              <th key={key} className={styles.sortable}>
                <div
                  className={styles["header-content"]}
                  onClick={() => handleSort(key)}
                >
                  {key === "orderNumber" && "Quote number"}
                  {key === "orderStatus" && "Quote type"}
                  {key === "createdDate" && "Activation date"}
                  {key === "orderAmount" && "Total amount"}
                  {key === "taxAmount" && "Tax"}
                  {key === "stateString" && "Status"}

                  <ArrowDownFilled
                    rotateUp={sortKey === key && sortOrder === "asc"}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sorted.map((q) => (
            <tr key={q.orderNumber}>
              <td>
                <span
                  onClick={() => handleQuoteClick(q.orderNumber)}
                  className={styles["quote-link"]}
                >
                  {q.orderNumber}
                </span>
              </td>
              <td>{q.orderStatus}</td>
              <td>{formatDate(q.createdDate)}</td>
              <td className={styles["order-amount"]}>
                {formatToUSD(q.orderAmount)}
              </td>
              <td>{formatToUSD(q.taxAmount)}</td>
              <td>
                <span
                  className={`${styles["status-badge"]} ${getStatusClass(
                    q?.stateString,
                  )}`}
                >
                  {q.stateString || "N/A"}
                </span>
              </td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr className={styles["no-quotes"]}>
              <td colSpan={6}>No quotes</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BillingTable;
