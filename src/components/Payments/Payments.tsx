import React from "react";
import { Column, Table } from "../UI/Table/Table";
import { Box } from "../UI/Box";
import SearchInput from "../UI/SearchInput.tsx/SearchInput.tsx";
import { DownloadSVG } from "../SVG/DownloadSVG";
import { Loading } from "../UI/Loading";
import { paymentPdf, useGetPayments } from "../../service/getPayments";
import { Error } from "../UI/Error";
import { PaymentInfo } from "../../types/PaymentsInterface";
import { formatDate } from "../../utils/formatDate";
import { PaymentCards } from "./PaymentCards";

export function Payments() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const {
    data: paymentsData,
    isLoading: paymentsLoading,
    isError: paymentsError,
  } = useGetPayments();

  const isFetching = paymentsLoading;
  const hasError = paymentsError;

  if (isFetching) {
    return <Loading />;
  }
  if (hasError) {
    return <Error />;
  }

  const payments = paymentsData?.clientPaymentInfo;

  const handleDownload = (receiptNumber: string) => {
    paymentPdf(receiptNumber);
  };

  const columns: Column<PaymentInfo>[] = [
    {
      header: "Payment Date",
      accessor: "paymentDate",
      sortable: true,
      searchable: true,
      Cell: (val) => formatDate(val as number),
    },
    {
      header: "Payment type",
      accessor: "paymentType",
      sortable: true,
      searchable: true,
      Cell: (val, row) => row.paymentType + " - " + row.paymentSourceType,
    },
    {
      header: "Receipt Number",
      accessor: "receiptNumber",
      isLink: true,
      sortable: true,
      Cell: (val: string) => (
        <Box
          onClick={() => handleDownload(val)}
          display="flex"
          alignItems="center"
          gap="8px"
        >
          <span>{val}</span>
          <DownloadSVG />
        </Box>
      ),
      searchable: true,
    },
    {
      header: "Amount",
      accessor: "paymentAmount",
      Cell: (val) => `$${Number(val).toFixed(2)}`,
      align: "right",
      sortable: true,
      searchable: true,
    },
  ];

  return (
    <Box display="flex" justifyContent="space-between" gap="48px">
      <Box display="flex" flexDirection="column" gap="30px">
        <SearchInput
          width="272px"
          name="searchQuotes"
          placeholder={`Search payments...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={{ minWidth: "752px" }}>
          <Table
            columns={columns}
            data={payments}
            searchTerm={searchTerm}
            emptyText="No payments"
          />
        </div>
      </Box>
      <PaymentCards />
    </Box>
  );
}
