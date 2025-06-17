import { OrderDetails } from "../../types/OrderDetailsInterface";
import { formatDate } from "../../utils/formatDate";
import { formatToUSD } from "../../utils/formatToUSD";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";
import styles from "./BillingTable.module.css";

export const BillingDetailsTable = ({ order }: { order: OrderDetails }) => {
  const orderList = order.clientOrderElementDetailsList;

  const tableHeaders = [
    "Product / Price Plan",
    "Activation  Date",
    "Frequency",
    "Unit Price",
    "Quantity",
    "Subtotal",
  ];
  return (
    <div className={styles["quote-table-container"]}>
      <table className={styles["quote-table"]}>
        <thead>
          <tr className={styles["quote-table-header-background"]}>
            {tableHeaders.map((key) => (
              <th key={key}>
                <div className={styles["header-content"]}>{key}</div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {orderList.map((item, index) => (
            <tr key={index} className={styles["quote-details-table-row"]}>
              <td>
                <div className={styles["product-info"]}>
                  <Typography>{item.productName}</Typography>
                  <Typography color="secondarytext" size="xsmall">
                    {item.subscriptionIdentifier}
                  </Typography>
                </div>
              </td>
              <td>{formatDate(item.activationStartDate)}</td>
              <td>{item.eventName.toLowerCase()}</td>
              <td className={styles["product-untit-price"]}>
                {formatToUSD(item.unitPriceString)}
              </td>
              <td className={styles["product-quantity"]}>
                {item.quantityString}
              </td>
              <td className={styles["product-subtotal"]}>
                {formatToUSD(item.subTotal)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles["quote-summary"]}>
        <Box
          width="200px"
          marginLeft="auto"
          display="flex"
          flexDirection="column"
          gap="10px"
        >
          <Box display="flex" justifyContent="space-between">
            <span className={styles["summary-label"]}>Subtotal</span>
            <span className={styles["summary-amount"]}>
              {order.netAmountString}
            </span>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <span className={styles["summary-label"]}>Tax</span>
            <span className={styles["summary-amount"]}>
              {order.taxAmountString}
            </span>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <span className={styles["summary-total"]}>Total</span>
            <span className={styles["summary-amount"]}>
              {order.totalAmountString}
            </span>
          </Box>
        </Box>
      </div>
    </div>
  );
};
