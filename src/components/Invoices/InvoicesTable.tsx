import React, { useMemo } from "react";
import { InvoiceInfo } from "../../types/InvoiceListingInterface";
import { formatDate } from "../../utils/formatDate";
import { formatToUSD } from "../../utils/formatToUSD";
import { Column, Table } from "../UI/Table/Table";
import { Badge } from "../UI/Badge/Badge";
import { InvoiceListingInterface } from "../../types/InvoiceListingInterface";
import { Button } from "../UI/Button";
import CardSVG from "../SVG/CardSVG";
import { Box } from "../UI/Box";
import { getInvoiceDetails } from "../../service/getInvoiceListing";

interface InvoicesTableProps {
  searchTerm: string;
  invoiceListing: InvoiceListingInterface;
  setSelectedInvoice: (invoice: InvoiceInfo | null) => void;
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({
  searchTerm,
  invoiceListing,
  setSelectedInvoice,
}) => {
  const orders = invoiceListing.clientInvoiceInfoList;

  const columns: Column<InvoiceInfo>[] = useMemo(
    () => [
      {
        header: "Invoice number",
        accessor: "invoiceNumber",
        sortable: true,
        isLink: true,
        searchable: true,
        Cell: (val: string) => (
          <span onClick={() => getInvoiceDetails(val)}>{val}</span>
        ),
      },
      {
        header: "Invoice Date",
        accessor: "invoiceDate",
        sortable: true,
        searchable: true,
        Cell: (val) => formatDate(Number(val)),
      },
      {
        header: "Invoice Due Date",
        accessor: "invoiceDueDate",
        sortable: true,
        searchable: true,
        Cell: (val) => formatDate(Number(val)),
      },
      {
        header: "Due amount",
        accessor: "dueAmount",
        sortable: true,
        align: "right",
        searchable: true,
        Cell: (val) => formatToUSD(Number(val)),
      },
      {
        header: "Amount",
        accessor: "amount",
        sortable: true,
        searchable: true,
        Cell: (val) => formatToUSD(Number(val)),
        align: "right",
        width: "15%",
      },
      {
        header: "Status",
        accessor: "status",
        sortable: true,
        align: "right",
        searchable: true,
        Cell: (val: string, row: InvoiceInfo) => {
          if (val === "Pay") {
            return (
              <Button
                bgColor="blueAccent"
                onClick={() => setSelectedInvoice(row)}
              >
                <Box display="flex" alignItems="center" gap="2px">
                  <CardSVG />
                  Pay
                </Box>
              </Button>
            );
          }
          return <Badge status={val || "N/A"} />;
        },
      },
    ],
    [setSelectedInvoice],
  );

  return (
    <Table
      columns={columns}
      data={orders}
      searchTerm={searchTerm}
      defaultSortKey="invoiceNumber"
      defaultSortOrder="asc"
      emptyText={`No invoices`}
    />
  );
};

export default InvoicesTable;
