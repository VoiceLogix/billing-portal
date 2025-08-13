import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { Badge } from "../UI/Badge/Badge";
import { Box } from "../UI/Box";
import { Button } from "../UI/Button";
import { Typography } from "../UI/Typography";
import { TicketData } from "./types";
import EdiitProperties from "./EdiitProperties";

interface TicketPropertiesProps {
  ticket: TicketData;
}

const TicketProperties = ({ ticket }: TicketPropertiesProps) => {
  const [showEditProperties, setShowEditProperties] = useState(false);

  const handleEditProperties = () => {
    setShowEditProperties(true);
  };
  const handleCloseEditProperties = () => {
    setShowEditProperties(false);
  };
  return (
    <>
      <Box
        border="1px solid"
        borderColor="border"
        borderRadius="8px"
        padding="12px"
        width="368px"
        height="fit-content"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Ticket Properties</Typography>
          <Button
            borderColor="blueAccent"
            borderSize="1px"
            color="blueAccent"
            text="Edit"
            onClick={handleEditProperties}
          />
        </Box>
        <Box marginTop="30px">
          <Box
            display="flex"
            justifyContent="space-between"
            marginTop="16px"
            borderBottom="1px solid"
            borderColor="border"
            paddingBottom="10px"
          >
            <Typography>Status</Typography>
            <Badge status={ticket.status} />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            marginTop="16px"
            borderBottom="1px solid"
            borderColor="border"
            paddingBottom="10px"
          >
            <Typography>Priority</Typography>
            <Badge status={ticket.priority} />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            marginTop="16px"
            borderBottom="1px solid"
            borderColor="border"
            paddingBottom="10px"
          >
            <Typography>Incident Type</Typography>
            <Typography weight="medium">{ticket.incidentType}</Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            marginTop="16px"
            borderBottom="1px solid"
            borderColor="border"
            paddingBottom="10px"
          >
            <Typography>Incident Subtype</Typography>
            <Typography weight="medium">{ticket.incidentSubType}</Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            marginTop="16px"
            borderBottom="1px solid"
            borderColor="border"
            paddingBottom="10px"
          >
            <Typography>Created</Typography>
            <Typography weight="medium">
              {formatDate(ticket.createdDate)}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            marginTop="16px"
            borderBottom="1px solid"
            borderColor="border"
            paddingBottom="10px"
          >
            <Typography>Updated</Typography>
            <Typography weight="medium">
              {formatDate(ticket.updatedDate)}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" marginTop="16px">
            <Typography>Assignee</Typography>
            <Typography weight="medium">{ticket.assignedTo}</Typography>
          </Box>
        </Box>
      </Box>
      {showEditProperties && (
        <EdiitProperties onClose={handleCloseEditProperties} ticket={ticket} />
      )}
    </>
  );
};
export default TicketProperties;
