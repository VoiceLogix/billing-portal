import { useState } from "react";
import { Box } from "../UI/Box";
import SearchInput from "../UI/Input.tsx/SearchInput.tsx";
import BillingTable from "./BillingTable";
import { useGetBillingListing } from "../../service/getQuoteListing";
import { Loading } from "../UI/Loading";
import { Error } from "../UI/Error";
import { BillingDetails } from "./BillingDetails";

export enum BillingType {
  Quotes = "Quotes",
  Orders = "Orders",
}

interface BillingProps {
  type: BillingType;
}

export const BillingListing = ({ type }: BillingProps) => {
  const typeWithoutS = type.endsWith("s") ? type.slice(0, -1) : type;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const {
    data: billingListing,
    isLoading: billingListingLoading,
    isError: billingListingError,
  } = useGetBillingListing(typeWithoutS);
  const isFetching = billingListingLoading;
  const hasError = billingListingError;

  if (isFetching) {
    return <Loading />;
  }
  if (hasError) {
    return <Error />;
  }
  return (
    <div>
      {selectedId && (
        <BillingDetails
          orderId={selectedId}
          setSelectedId={setSelectedId}
          type={type}
        />
      )}
      <Box display="flex" flexDirection="column" gap="30px">
        <SearchInput
          width="272px"
          name="searchQuotes"
          placeholder={`Search ${type}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <BillingTable
          setSelectedId={setSelectedId}
          billingListing={billingListing}
          searchTerm={searchTerm}
          type={type}
        />
      </Box>
    </div>
  );
};

export default BillingListing;
