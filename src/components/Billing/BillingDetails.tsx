import { useState } from "react";
import Model from "../UI/Model/Model";
import { Box } from "../UI/Box";
import { Typography } from "../UI/Typography";
import { Loading } from "../UI/Loading";
import { Error } from "../UI/Error";
import { formatDate } from "../../utils/formatDate";
import styles from "./BillingTable.module.css";
import { BillingDetailsTable } from "./BillingDetailsTable";
import { Button } from "../UI/Button";
import { useGetOrderDetails } from "../../service/getOrderDetails";
import { BillingType } from "./BillingListing";
import { Badge } from "../UI/Badge/Badge";

export const BillingDetails = ({
  orderId,
  setSelectedId,
  type,
}: {
  orderId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  type: BillingType;
}) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const {
    data: orderDetails,
    isLoading: orderdetailsLoading,
    isError: orderdetailsError,
  } = useGetOrderDetails(orderId);

  const order = orderDetails?.clientOrderDetails;

  const typeWithoutS = type.endsWith("s") ? type.slice(0, -1) : type;
  return (
    <Model
      open={open}
      handleClose={handleClose}
      title={`${typeWithoutS} Details`}
      width="1000px"
    >
      {order && (
        <Box marginTop="24px">
          <Box display="flex" gap="100px">
            <Box display="flex" flexDirection="column" gap="10px">
              <Box display="flex" gap="20px">
                <Typography>{typeWithoutS} ID:</Typography>
                <Typography weight="semibold">{order.orderId}</Typography>
              </Box>
              <Box display="flex" gap="32px">
                <Typography>Status:</Typography>
                <Badge status={order.stateString as string} />
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
            <BillingDetailsTable order={order} />
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
