import { useMemo } from "react";
import { formatToUSD } from "../../utils/formatToUSD";
import { Column, Table } from "../UI/Table/Table";
import { ChargeDetail } from "../../types/SubscriptionInterface";

interface SubscriptionDetailsTableProps {
  chargeDetails: ChargeDetail[];
  quantity: string;
}

export const SubscriptionDetailsTable = ({
  chargeDetails,
  quantity,
}: SubscriptionDetailsTableProps) => {
  const columns: Column<ChargeDetail>[] = useMemo(
    () => [
      {
        header: "Recurring Type",
        accessor: "eventType",
        Cell: (val) => (val === "REC" ? "Recurrent" : "Non-Recurrent"),
      },
      {
        header: "Frequency",
        accessor: "eventName",
        Cell: (val: string) => val.toLowerCase(),
      },
      {
        header: "Active Units",
        accessor: "quantity",
        Cell: (_) => Number(quantity) + " users",
      },
      {
        header: "Unit Price",
        accessor: "unitGrossAmount",
        Cell: (val) => formatToUSD(val),
        align: "center",
      },
      {
        header: "Discount",
        accessor: "discountAmount",
        align: "right",
        Cell: (val) => formatToUSD(val as number),
        width: "100px",
      },
      {
        header: "Tax",
        accessor: "taxAmount",
        align: "right",
        Cell: (val) => formatToUSD(val as number),
      },
      {
        header: "Subtotal",
        accessor: "netAmount",
        align: "right",
        Cell: (val) => formatToUSD(Number(val) * Number(quantity)),
      },
    ],
    [],
  );

  return (
    <Table columns={columns} data={chargeDetails} headerBackground={true} />
  );
};
