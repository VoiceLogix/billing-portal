import { Box } from "../UI/Box";
import { useGetProfileDetails } from "../../service/getProfileDetails";
import { Loading } from "../UI/Loading";
import { Error } from "../UI/Error";
import { AccountOverview } from "./AccountOverview";
import { Addresses } from "./Addresses";
import { Contacts } from "./Contacts";

export const CompanyProfile = () => {
  const {
    data: profileDetails,
    isLoading: profileDetailsLoading,
    isError: profileDetailsError,
  } = useGetProfileDetails();

  if (profileDetailsLoading) {
    return <Loading />;
  }
  if (profileDetailsError) {
    return <Error />;
  }
  if (!profileDetails && !profileDetailsLoading) {
    return <Error />;
  }

  return (
    <Box minWidth="800px">
      <AccountOverview
        ClientSubscriberInfo={profileDetails?.clientSubscriberInfo}
      />
      <Addresses
        lstAddresses={profileDetails?.clientSubscriberInfo?.lstAddresses}
        clientCountryDTOList={profileDetails?.clientCountryDTOList}
      />
      <Contacts
        contacts={profileDetails?.clientSubscriberInfo?.clientCustomerContacts}
      />
    </Box>
  );
};
