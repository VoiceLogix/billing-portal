import { useState } from "react";
import { Box } from "../UI/Box";
import SearchInput from "../UI/Input.tsx/SearchInput.tsx";
import InvoicesTable from "./InvoicesTable";
import { Loading } from "../UI/Loading";
import { Error } from "../UI/Error";
import { InvoicesDetails } from "./InvoicesDetails";
import { useGetInvoiceListing } from "../../service/billing_center/getInvoiceListing";
import { InvoiceInfo } from "../../types/InvoiceListingInterface";

export const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceInfo | null>(
    null,
  );
  const {
    data: invoiceListing,
    isLoading: invoiceListingLoading,
    isError: invoiceListingError,
  } = useGetInvoiceListing();

  const isFetching = invoiceListingLoading;
  const hasError = invoiceListingError;

  if (isFetching) {
    return <Loading />;
  }
  if (hasError) {
    return <Error />;
  }
  return (
    <div>
      {selectedInvoice && (
        <InvoicesDetails
          invoiceDetails={selectedInvoice}
          setSelectedInvoice={setSelectedInvoice}
        />
      )}
      <Box display="flex" flexDirection="column" gap="30px">
        <SearchInput
          width="272px"
          name="searchQuotes"
          placeholder={`Search invoices...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <InvoicesTable
          setSelectedInvoice={setSelectedInvoice}
          invoiceListing={invoiceListing}
          searchTerm={searchTerm}
        />
      </Box>
    </div>
  );
};

export default Invoices;
