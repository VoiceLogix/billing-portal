import { useState } from "react";
import { Box } from "../UI/Box";
import Dropdown from "../UI/Dropdown/Dropdown";

const statuses = [
  "All statuses",
  "active",
  "pending Activation",
  "Suspended",
  "Cancelled",
];

const charges = ["All charges types", "Recurrent", "Non-Recurrent"];

export default function Subscriptions() {
  const [status, setStatus] = useState(statuses[0]);
  const [charge, setCharge] = useState(charges[0]);
  return (
    <Box marginTop="30px">
      <Box display="flex" width="408px" gap="8px">
        <Dropdown
          label=""
          value={status}
          items={statuses}
          onChange={(item) => setStatus(item)}
          width="100%"
        />
        <Dropdown
          label=""
          value={charge}
          items={charges}
          onChange={(item) => setCharge(item)}
          width="100%"
        />
      </Box>
    </Box>
  );
}
