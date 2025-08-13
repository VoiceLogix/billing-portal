import { useEffect, useState } from "react";
import { Box } from "../UI/Box";
import SearchInput from "../UI/Input.tsx/SearchInput.tsx";
import Dropdown from "../UI/Dropdown/Dropdown";
import { CalendarSVG } from "../SVG/CalenderSVG";
import { FilterSVG } from "../SVG/FilterSVG";
import {
  Filter_Selection,
  sampleTickets,
  Time_Selection,
  applyAllFilters,
} from "./utils";
import MultiSelectDropdown from "../UI/MultiSelectDropdown/MultiSelectDropdown";
import { Button } from "../UI/Button";
import TicketsTable from "./TicketsTable";
import AddTicketModel from "./AddTicketModel";
import SelectedTicket from "./SelectedTicket";

export default function ServiceDesk() {
  const [tickets, setTickets] = useState(sampleTickets);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTime, setSelectedTime] = useState(Time_Selection[0]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showAddTicketModal, setShowAddTicketModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const handleSelectedTicket = (ticketId: string) => {
    setSelectedTicketId(ticketId);
  };

  const handleTimeSelection = (time: (typeof Time_Selection)[number]) => {
    setSelectedTime(time);
  };

  const handleFilterSelection = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  useEffect(() => {
    const filteredTickets = applyAllFilters(
      sampleTickets,
      selectedTime,
      selectedFilters,
    );
    setTickets(filteredTickets);
  }, [selectedTime, selectedFilters]);

  return (
    <>
      <AddTicketModel
        show={showAddTicketModal}
        onClose={() => setShowAddTicketModal(false)}
      />
      {!selectedTicketId && (
        <Box display="flex" flexDirection="column" gap="30px" width="100%">
          <Box display="flex" flexDirection="column" gap="30px" width="100%">
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" gap="16px">
                <Box>
                  <SearchInput
                    width="272px"
                    name="searchTickets"
                    placeholder={`Search tickets...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Box>
                <Dropdown
                  value={selectedTime}
                  items={Time_Selection}
                  onChange={handleTimeSelection}
                  width="100%"
                  icon={<CalendarSVG />}
                />
                <MultiSelectDropdown
                  items={Filter_Selection}
                  onChange={handleFilterSelection}
                  selected={selectedFilters}
                  width="100%"
                  icon={<FilterSVG />}
                />
              </Box>
              <Button
                bgColor="blueAccent"
                text="Create Ticket"
                onClick={() => setShowAddTicketModal(true)}
              />
            </Box>
          </Box>

          <TicketsTable
            tickets={tickets}
            searchTerm={searchTerm}
            setSelectedTicketId={handleSelectedTicket}
          />
        </Box>
      )}
      {selectedTicketId && (
        <SelectedTicket
          selectTicketId={selectedTicketId}
          onBack={() => setSelectedTicketId(null)}
        />
      )}
    </>
  );
}
