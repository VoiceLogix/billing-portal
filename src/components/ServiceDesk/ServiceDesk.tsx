import { useState } from "react";
import { Box } from "../UI/Box";
import SearchInput from "../UI/Input.tsx/SearchInput.tsx";
import Dropdown from "../UI/Dropdown/Dropdown";

const STATUS_OPTIONS = [
  { label: "Any Time", value: "all" },
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
];

export default function ServiceDesk() {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  return (
    <Box display="flex" justifyContent="space-between" gap="80px">
      <Box display="flex" flexDirection="column" gap="30px">
        <Box display="flex" gap="16px">
          <SearchInput
            width="272px"
            name="searchTickets"
            placeholder={`Search tickets...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dropdown
            value={status.label}
            items={STATUS_OPTIONS.map((opt) => opt.label)}
            onChange={(label) => {
              const selected = STATUS_OPTIONS.find(
                (opt) => opt.label === label,
              );
              if (selected) setStatus(selected);
            }}
            width="100%"
          />
        </Box>
      </Box>
    </Box>
  );
}
