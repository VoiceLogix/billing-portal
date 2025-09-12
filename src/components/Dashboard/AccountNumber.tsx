import { useGetAccountSummaryCounts } from "../../service/billing_center/getAccountSummaryCounts";
import { BriefcaseSVG } from "../SVG/BriefcaseSVG";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";
import { CardLayout } from "../UI/CardLayout/CardLayout";
import { useGetSubscriberInfo } from "../../service/billing_center/getSubscriberInfo";

export const AccountNumber = () => {
  const { data: accountSummary } = useGetAccountSummaryCounts();
  const { data: subscriberInfo } = useGetSubscriberInfo();
  const addressLen = subscriberInfo?.address?.length;
  const contactLen = subscriberInfo?.contact?.length;

  return (
    <CardLayout width="368px" height="331px">
      <Box display="flex" flexDirection="column" gap="16px">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
            <Typography color="secondaryText">Account Number</Typography>
            <Typography size="large" weight="medium">
              {subscriberInfo?.accountNumber}
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
    </CardLayout>
  );
};
