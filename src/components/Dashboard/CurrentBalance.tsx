import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { useGetSubscriber } from "../../service/getSubscriber";
import { formatToUSD } from "../../utils/formatToUSD";
import "./styles.css";
import { useGetSubscriberInvoices } from "../../service/getSubscriberInvoices";
import { formatDate } from "../../utils/formatDate";
import { useGetSubscriberPayments } from "../../service/getSubscriberPayments";
export const CurrentBalance = () => {
  // const subscriberId = "SR2202"; // Replace with actual subscriber ID or pass it as a prop
  const subscriberId = "SR2002"; // Replace with actual subscriber ID or pass it as a prop
  const {
    data: subscriber,
    isLoading,
    isError,
  } = useGetSubscriber(subscriberId);
  console.log("subscriber", subscriber);
  const { data: subscriberInvoice } = useGetSubscriberInvoices(
    subscriber?.accountNumber,
  );

  const {
    data: subscriberPayments,
    isLoading: isPaymentsLoading,
    isError: isPaymentsError,
  } = useGetSubscriberPayments(subscriber?.accountNumber);
  console.log("subscriberPayments", subscriberPayments);

  // console.log("subscriberInvoice", subscriberInvoice);

  const lastInvoice = subscriberInvoice?.invoice?.[0] || null;
  // console.log("lastInvoice", lastInvoice);

  return (
    <>
      {subscriber && (
        <Box className="layoutWithBorder" width="368px">
          <Flex direction="column" gap="5">
            <Flex direction="column" gap="2">
              <Text size="2" color="gray">
                Current Balance
              </Text>
              <Heading size="5" weight="medium">
                {formatToUSD(subscriber?.accountBalance?.totalAmount)}
              </Heading>
            </Flex>

            <Flex direction="column" gap="3">
              <Flex gap="4" justify="between" px="2">
                <Text size="2">Last Invoice</Text>
                <Text size="2" color="gray">
                  {lastInvoice?.invoiceDate
                    ? formatDate(lastInvoice.invoiceDate)
                    : "--"}
                </Text>
                <Text size="2">
                  {lastInvoice?.amount ? formatToUSD(lastInvoice.amount) : "-"}
                </Text>
              </Flex>
              <hr
                style={{
                  border: "1px solid #E6E6E6",
                }}
              />
              <Flex gap="4" justify="between" px="2">
                <Text size="2">Last Invoice</Text>
                <Text size="2" color="gray">
                  {lastInvoice?.invoiceDate
                    ? formatDate(lastInvoice.invoiceDate)
                    : "--"}
                </Text>
                <Text size="2">
                  {lastInvoice?.amount ? formatToUSD(lastInvoice.amount) : "-"}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      )}
      {!subscriber && isLoading && <p>Loading...</p>}
      {!subscriber && isError && <p>Error loading subscriber data</p>}
    </>
  );
};
