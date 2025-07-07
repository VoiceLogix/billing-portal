import React, { useMemo, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { formatToUSD } from "../../utils/formatToUSD";
import { Column, Table } from "../UI/Table/Table";
import { InvoiceInfo } from "../../types/InvoiceListingInterface";
import CurrencyInput from "../UI/Input.tsx/CurrencyInput";
import { Button } from "../UI/Button";

export const InvoicesDetailsTable = ({
  invoiceDetails,
  amount,
  setAmount,
}: {
  invoiceDetails: InvoiceInfo;
  amount: string;
  setAmount: (amount: string) => void;
}) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let incoming = Number(e.target.value) || 0;

    const max = invoiceDetails.amount;
    if (incoming > max) incoming = max;
    if (incoming < 0) incoming = 0;

    setAmount(incoming.toString());
  };

  const handleClear = () => {
    setAmount("");
  };
  const handleFull = () => {
    setAmount(invoiceDetails.amount.toString());
  };

  const isFullAmount = Number(amount) === invoiceDetails.amount;
  const columns: Column<InvoiceInfo>[] = useMemo(
    () => [
      {
        header: "Invoice Date",
        accessor: "invoiceDate",
        width: "200px",
        Cell: (val) => formatDate(val),
      },
      {
        header: "Invoice Number",
        accessor: "invoiceNumber",
        width: "200px",
        Cell: (val) => val,
      },
      {
        header: "Amount",
        accessor: "amount",
        Cell: (val) => formatToUSD(val),
        width: "150px",
      },
      {
        header: "Due Amount",
        accessor: "",
        align: "right",
        Cell: (_, row) =>
          formatToUSD(Math.max(0, row.amount - (Number(amount) || 0))),
        width: "150px",
      },
      {
        header: "Pay Amount",
        accessor: "",
        align: "right",
        Cell: () => (
          <div style={{ display: "flex", justifyContent: "end" }}>
            <CurrencyInput value={amount} onChange={handleAmountChange} />
          </div>
        ),
        width: "180px",
        key: "amount-input",
      },
      {
        header: "",
        accessor: "",
        Cell: () => (
          <Button
            color="blueText"
            onClick={isFullAmount ? handleClear : handleFull}
          >
            {isFullAmount ? "Clear" : "Full"}
          </Button>
        ),
        align: "right",
        key: "clear",
      },
    ],
    [amount, setAmount],
  );

  return (
    <div>
      <Table
        columns={columns}
        data={[invoiceDetails]}
        headerBackground={true}
      />
    </div>
  );
};
