import React, { useMemo } from "react";
import {
  ClientOrderInfo,
  QuoteListingInterface,
} from "../../types/QuoteListingInterface";
import { formatDate } from "../../utils/formatDate";
import { formatToUSD } from "../../utils/formatToUSD";
import { Column, Table } from "../UI/Table/Table";
import { BillingType } from "./BillingListing";
import { Badge } from "../UI/Badge/Badge";

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
  type,
}) => {
  const orders = billingListing.clientOrderInfoList;

  const columns: Column<ClientOrderInfo>[] = useMemo(
    () => [
      {
        header: "Quote number",
        accessor: "orderNumber",
        sortable: true,
        isLink: true,
        searchable: true,
        Cell: (val: string) => (
          <span onClick={() => setSelectedId(val)}>{val}</span>
        ),
      },
      {
        header: "Quote type",
        accessor: "orderStatus",
        sortable: true,
        searchable: true,
      },
      {
        header: "Activation date",
        accessor: "createdDate",
        sortable: true,
        searchable: true,
        Cell: (val) => formatDate(Number(val)),
      },
      {
        header: "Total amount",
        accessor: "orderAmount",
        sortable: true,
        align: "right",
        searchable: true,
        Cell: (val) => formatToUSD(Number(val)),
      },
      {
        header: "Tax",
        accessor: "taxAmount",
        sortable: true,
        searchable: true,
        Cell: (val) => formatToUSD(Number(val)),
        align: "right",
        width: "15%",
      },
      {
        header: "Status",
        accessor: "stateString",
        sortable: true,
        align: "right",
        searchable: true,
        Cell: (val: string) => <Badge status={val || "N/A"} />,
      },
    ],
    [setSelectedId],
  );

  return (
    <Table
      columns={columns}
      data={orders}
      searchTerm={searchTerm}
      defaultSortKey="orderNumber"
      defaultSortOrder="asc"
      emptyText={`No ${type}`}
    />
  );
};

export default BillingTable;
