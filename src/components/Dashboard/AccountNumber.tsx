import { useGetAccountSummaryCounts } from "../../service/getAccountSummaryCounts";
import { useGetProfileDetails } from "../../service/getProfileDetails";
import { BriefcaseSVG } from "../SVG/BriefcaseSVG";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";

export const AccountNumber = () => {
  const { data: accountSummary } = useGetAccountSummaryCounts();
  const { data: profileDetails } = useGetProfileDetails();
  const addressLen = profileDetails?.lstAddresses?.length;
  const contactLen = profileDetails?.clientCustomerContacts?.length;

  return (
    <Box width="368px" height="331px" className="layoutWithBorder">
      <Box display="flex" flexDirection="column" gap="16px">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
            <Typography color="secondarytext">Account Number</Typography>
            <Typography size="large" weight="medium">
              {profileDetails?.accountNumber}
            </Typography>
          </Box>
          <Box>
            <BriefcaseSVG />
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap="9px" padding="0 8px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width="166px">
              <Typography>Open Quotes</Typography>
            </Box>
            <Typography weight="medium">
              {accountSummary?.openQuotes}
            </Typography>
          </Box>

          <hr style={{ border: "1px solid #E6E6E6" }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width="165px">
              <Typography>Open Orders</Typography>
            </Box>

            <Typography weight="medium">
              {accountSummary?.openOrders}
            </Typography>
          </Box>

          <hr style={{ border: "1px solid #E6E6E6" }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width="165px">
              <Typography>Open Inovices</Typography>
            </Box>

            <Typography weight="medium">
              {accountSummary?.openInvoices}
            </Typography>
          </Box>

          <hr style={{ border: "1px solid #E6E6E6" }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width="165px">
              <Typography>Active Subscriptions</Typography>
            </Box>

            <Typography weight="medium">
              {accountSummary?.activeSubscriptions}
            </Typography>
          </Box>
          <hr style={{ border: "1px solid #E6E6E6" }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width="165px">
              <Typography>Addresses</Typography>
            </Box>

            <Typography weight="medium">{addressLen}</Typography>
          </Box>
          <hr style={{ border: "1px solid #E6E6E6" }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width="165px">
              <Typography>Contacts</Typography>
            </Box>

            <Typography weight="medium">{contactLen}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
