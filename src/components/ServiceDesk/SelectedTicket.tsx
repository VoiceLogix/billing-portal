import { MoveLeft } from "lucide-react";
import { Box } from "../UI/Box";
import { Button } from "../UI/Button";
import { Typography } from "../UI/Typography";
import { Badge } from "../UI/Badge/Badge";
import TicketBody from "./TicketBody";
import TicketProperties from "./TicketProperties";
import TicketComments from "./TicketComments";
import TicketSendMessage from "./TicketSendMessage";
import EscalateTicket from "./EscalateTicket";
import { useState } from "react";
import AddTicketModel from "./AddTicketModel";
import { sampleTickets } from "./utils";
import { FlagSVG } from "../SVG/FlagSVG";

interface SelectedTicketProps {
  selectTicketId: string | null;
  onBack: () => void;
}

const SelectedTicket = ({ selectTicketId, onBack }: SelectedTicketProps) => {
  const ticket = sampleTickets.find(
    (ticket) => ticket.ticketNumber === selectTicketId,
  );
  const [showUpdateTicket, setShowUpdateTicket] = useState(false);
  const [showEscalateTicket, setShowEscalateTicket] = useState(false);
  const handleEscalateTicket = () => {
    setShowEscalateTicket(true);
  };
  const handleCloseEscalateTicket = () => {
    setShowEscalateTicket(false);
  };
  const handleUpdateTicket = () => {
    setShowUpdateTicket(true);
  };
  const handleCloseUpdateTicket = () => {
    setShowUpdateTicket(false);
  };

  return (
    <>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap="16px">
            <Button
              color="blueText"
              borderColor="blueText"
              borderSize="1px"
              onClick={onBack}
            >
              <MoveLeft size={16} style={{ marginRight: "8px" }} />
              <span>All Tickets</span>
            </Button>
            <Box display="flex" flexDirection="column">
              <Box display="flex" gap="8px" alignItems="center">
                <Typography size="medium" weight="semibold">
                  {ticket?.ticketNumber}
                </Typography>
                <Badge status={ticket?.status || "N/A"} />
                {ticket?.flag && <FlagSVG />}
              </Box>
              <Typography weight="medium">{ticket?.subject}</Typography>
            </Box>
          </Box>
          <Box display="flex" gap="8px">
            <Button
              color="blueText"
              borderColor="blueText"
              borderSize="1px"
              text={ticket?.flag ? "De-Escalate" : "Escalate"}
              onClick={handleEscalateTicket}
            />
            <Button
              color="blueText"
              borderColor="blueText"
              borderSize="1px"
              text="Update Ticket"
              onClick={handleUpdateTicket}
            />
          </Box>
        </Box>
        <Box
          marginTop="20px"
          marginBottom="20px"
          borderTop="1px solid"
          borderColor="border"
        />
        <Box display="flex" justifyContent="space-between">
          <Box>
            <TicketBody ticket={ticket} />
            <TicketComments ticket={ticket} />
            <TicketSendMessage />
          </Box>
          <TicketProperties ticket={ticket} />
        </Box>
      </Box>
      {showEscalateTicket && (
        <EscalateTicket onClose={handleCloseEscalateTicket} ticket={ticket} />
      )}
      {showUpdateTicket && (
        <AddTicketModel
          show={showUpdateTicket}
          onClose={handleCloseUpdateTicket}
          ticket={ticket}
        />
      )}
    </>
  );
};

export default SelectedTicket;
