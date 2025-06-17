import React, { useState } from "react";
import { Box } from "../UI/Box";
import SearchInput from "../UI/SearchInput.tsx/SearchInput.tsx";
import QuoteTable from "./QuoteTable";
import { useGetQuoteListing } from "../../service/getQuoteListing";
import { Loading } from "../UI/Loading";
import { Error } from "../UI/Error";
import { QuoteDetails } from "./QuoteDetails";

export const Quotes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const {
    data: quoteListing,
    isLoading: quoteListingLoading,
    isError: quoteListingError,
  } = useGetQuoteListing();
  const isFetching = quoteListingLoading;
  const hasError = quoteListingError;

  if (isFetching) {
    return <Loading />;
  }
  if (hasError) {
    return <Error />;
  }
  return (
    <div>
      {selectedQuoteId && (
        <QuoteDetails
          orderId={selectedQuoteId}
          setQuoteId={setSelectedQuoteId}
        />
      )}
      <Box display="flex" flexDirection="column" gap="30px">
        <SearchInput
          width="272px"
          name="searchQuotes"
          placeholder="Search Quotes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <QuoteTable
          setSelectedQuoteId={setSelectedQuoteId}
          quoteListing={quoteListing}
          searchTerm={searchTerm}
        />
      </Box>
    </div>
  );
};

export default Quotes;
