import { useMemo } from "react";
import { OrderDetails } from "../../types/OrderDetailsInterface";
import { formatDate } from "../../utils/formatDate";
import { formatToUSD } from "../../utils/formatToUSD";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";
import { Column, Table } from "../UI/Table/Table";
import OrderSummary from "../UI/OrderSummary/OrderSummary";

type OrderItem = OrderDetails["clientOrderElementDetailsList"][0];

export const BillingDetailsTable = ({ order }: { order: OrderDetails }) => {
  const orderList = order.clientOrderElementDetailsList;

  const columns: Column<OrderItem>[] = useMemo(
    () => [
      {
        header: "Product / Price Plan",
        accessor: "productName",
        width: "300px",
        Cell: (_, row: OrderItem) => (
          <Box display="flex" flexDirection="column">
            <Typography>{row.productName}</Typography>

            <Typography color="secondaryText">
              {row.subscriptionIdentifier}
            </Typography>
          </Box>
        ),
      },
      {
        header: "Activation Date",
        accessor: "activationStartDate",
        Cell: (val) => formatDate(val as number),
      },
      {
        header: "Frequency",
        accessor: "eventName",
        Cell: (val: string) => val.toLowerCase(),
        align: "center",
      },
      {
        header: "Unit Price",
        accessor: "unitPriceString",
        align: "right",
        Cell: (val) => formatToUSD(val as number),
        width: "100px",
      },
      {
        header: "Quantity",
        accessor: "quantityString",
        align: "right",
      },
      {
        header: "Subtotal",
        accessor: "subTotal",
        align: "right",
        Cell: (val) => formatToUSD(val as number),
      },
    ],
    [],
  );

  return (
    <div>
      <Table columns={columns} data={orderList} headerBackground={true} />
      <Box width="220px" marginLeft="auto" marginTop="5px" marginRight="5px">
        <OrderSummary
          subtotal={order.netAmountString}
          tax={order.taxAmountString}
          total={order.totalAmountString}
        />
      </Box>
    </div>
  );
};
