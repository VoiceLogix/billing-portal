import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { useOneBillSubscriber } from "../../service/getOneBillSubscriber";
import { formatToUSD } from "../../utils/formatToUSD";
import "./styles.css";
export const CurrentBalance = () => {
  const { data: subscriber, isLoading, isError } = useOneBillSubscriber();
  console.log("subscriber", subscriber);

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
                {formatToUSD(subscriber.accountBalance.totalAmount)}
              </Heading>
            </Flex>

            <Flex direction="column" gap="3">
              <Flex gap="4" justify="between" px="2">
                <Text size="2">Last Invoice</Text>
                <Text size="2" color="gray">
                  Apr 25, 2025
                </Text>
                <Text size="2">$68.00</Text>
              </Flex>
              <hr
                style={{
                  border: "1px solid #E6E6E6",
                }}
              />
              <Flex gap="4" justify="between" px="2">
                <Text size="2">Last Invoice</Text>
                <Text size="2" color="gray">
                  Apr 25, 2025
                </Text>
                <Text size="2">$68.00</Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      )}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading subscriber data</p>}
    </>
  );
};
