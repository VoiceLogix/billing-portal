import { useState } from "react";
import Model from "../UI/Model/Model";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";
import { useGetOrderDetails } from "../../service/getOrderdetails";
import { Loading } from "../UI/Loading";
import { Error } from "../UI/Error";
import { formatDate } from "../../utils/formatDate";
import styles from "./QuoteTable.module.css";
import { getStatusClass } from "./utils";
import { QuoteDetailsTable } from "./QuoteDetailsTable";
import { Button } from "../UI/Button";

export const QuoteDetails = ({
  orderId,
  setQuoteId,
}: {
  orderId: string;
  setQuoteId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setQuoteId(null);
  };

  const {
    data: orderDetails,
    isLoading: orderdetailsLoading,
    isError: orderdetailsError,
  } = useGetOrderDetails(orderId);

  const order = orderDetails?.clientOrderDetails;
  return (
    <Model
      open={open}
      handleClose={handleClose}
      title="Quote details"
      width="1000px"
      subtitle="View the details of the quote"
    >
      {order && (
        <Box marginTop="24px">
          <Box display="flex" gap="100px">
            <Box display="flex" flexDirection="column" gap="10px">
              <Box display="flex" gap="20px">
                <Typography>Quote ID:</Typography>
                <Typography weight="semibold">{order.orderId}</Typography>
              </Box>
              <Box display="flex" gap="32px">
                <Typography>Status:</Typography>
                <span
                  className={`${styles["status-badge"]} ${getStatusClass(
                    order.stateString,
                  )}`}
                >
                  {order.stateString}
                </span>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap="10px">
              <Box display="flex" gap="51px">
                <Typography>Date:</Typography>
                <Typography weight="semibold">
                  {formatDate(order.createdDate)}
                </Typography>
              </Box>
              <Box display="flex" gap="10px">
                <Typography>Created By:</Typography>
                <Typography weight="semibold">
                  {order.orderCreatedBy}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            marginTop="24px"
            display="flex"
            flexDirection="column"
            gap="10px"
          >
            <QuoteDetailsTable order={order} />
            <Box display="flex" justifyContent="flex-end" marginTop="20px">
              <Button
                onClick={handleClose}
                bgColor="bgNeutral"
                text="Close"
                color="neutral"
              />
            </Box>
          </Box>
        </Box>
      )}
      {orderdetailsLoading && <Loading />}
      {orderdetailsError && <Error />}
    </Model>
  );
};
