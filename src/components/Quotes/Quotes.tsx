import { useState } from "react";
import { Box } from "../UI/Box";
import SearchInput from "../UI/SearchInput.tsx/SearchInput.tsx";
import { ArrowDownFilled } from "../SVG/ArrowDownFilled";
import QuoteTable from "./QuoteTable";

export const Quotes = () => {
  return (
    <Box display="flex" flexDirection="column" gap="30px">
      <SearchInput
        width="272px"
        name="searchQuotes"
        placeholder="Search Quotes..."
      />

      <QuoteTable />
    </Box>
  );
};
export default Quotes;
