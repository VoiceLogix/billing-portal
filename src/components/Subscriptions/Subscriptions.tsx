import { useState, useMemo } from "react";
import { Box } from "../UI/Box";
import Dropdown from "../UI/Dropdown/Dropdown";
import SubscriptionItem from "./SubscriptionItem";
import { useGetSubscriptionsList } from "../../service/billing_center/getSubscriptionsList";
import { Loading } from "../UI/Loading";
import { Error } from "../UI/Error";
import { CardLayout } from "../UI/CardLayout/CardLayout";

const STATUS_OPTIONS = [
  { label: "All statuses", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Pending Activation", value: "Pending Activation" },
  { label: "Suspended", value: "Suspend" },
  { label: "Cancelled", value: "Cancel" },
];

const CHARGE_OPTIONS = [
  { label: "All charges types", value: "All" },
  { label: "Recurrent", value: "Recurring" },
  { label: "Non-Recurrent", value: "Non-Recurring" },
];

export default function Subscriptions() {
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [charge, setCharge] = useState(CHARGE_OPTIONS[0]);

  const requestData = useMemo(
    () => ({
      searchIdentifier: "",
      status: status.value,
      type: charge.value,
      startCount: 0,
      resultCount: 15,
      groupedBy: "IDENTIFIER",
      isFilterOrGroupBy: false,
      addressIds: null,
      productIds: null,
      pricePlanName: null,
      provisionAttributeDto: null,
    }),
    [status, charge],
  );

  const {
    data: subscriptionList,
    isLoading,
    isError,
  } = useGetSubscriptionsList(requestData);

  if (isLoading) return <Loading />;
  if (isError || !subscriptionList?.successful) return <Error />;

  return (
    <Box marginTop="30px">
      <Box display="flex" width="408px" gap="8px">
        <Dropdown
          value={status.label}
          items={STATUS_OPTIONS.map((opt) => opt.label)}
          onChange={(label) => {
            const selected = STATUS_OPTIONS.find((opt) => opt.label === label);
            if (selected) setStatus(selected);
          }}
          width="100%"
        />
        <Dropdown
          value={charge.label}
          items={CHARGE_OPTIONS.map((opt) => opt.label)}
          onChange={(label) => {
            const selected = CHARGE_OPTIONS.find((opt) => opt.label === label);
            if (selected) setCharge(selected);
          }}
          width="100%"
        />
      </Box>

      <Box marginTop="20px" display="flex" flexDirection="column" gap="20px">
        {subscriptionList?.subscriptionInstance?.length ? (
          subscriptionList.subscriptionInstance.map((subscription) => (
            <SubscriptionItem
              key={subscription.identifier}
              subscription={subscription}
            />
          ))
        ) : (
          <CardLayout width="100%" height="200px">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              No subscriptions
            </Box>
          </CardLayout>
        )}
      </Box>
    </Box>
  );
}
