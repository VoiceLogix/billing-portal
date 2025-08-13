import { useMemo } from "react";
import { Column, Table } from "../UI/Table/Table";
import { Badge } from "../UI/Badge/Badge";
import { formatDateTimeObject } from "../../utils/formatDate";
import { FlagSVG } from "../SVG/FlagSVG";
import { Typography } from "../UI/Typography";
import { Box } from "../UI/Box";

interface TicketTableData {
  ticketNumber: string;
  status: string;
  flag: boolean;
  incidentType: string;
  incidentSubType: string;
  priority: string;
  createdDate: number;
  updatedDate: number;
  contact: string;
}

interface TicketsTableProps {
  tickets: TicketTableData[];
  searchTerm: string;
  setSelectedTicketId: (ticketId: string) => void;
}

const TicketsTable = ({
  tickets,
  searchTerm,
  setSelectedTicketId,
}: TicketsTableProps) => {
  const columns: Column<TicketTableData>[] = useMemo(
    () => [
      {
        header: `Ticket`,
        accessor: "ticketNumber",
        sortable: true,
        isLink: true,
        searchable: true,
        minWidth: "150px",
        Cell: (val: string, row: TicketTableData) => (
          <span onClick={() => setSelectedTicketId(row.ticketNumber)}>
            {val}
          </span>
        ),
      },
      {
        header: `Status`,
        accessor: "status",
        sortable: true,
        searchable: true,
        minWidth: "150px",

        Cell: (val: string) => <Badge status={val || "N/A"} />,
      },

      {
        header: "Flag",
        accessor: "flag",
        sortable: true,
        searchable: true,
        Cell: (val) => val && <FlagSVG />,
      },
      {
        header: "Incident Type",
        accessor: "incidentType",
        sortable: true,
        searchable: true,
        minWidth: "250px",
      },
      {
        header: "Incident Subtype",
        accessor: "incidentSubType",
        sortable: true,
        searchable: true,
        minWidth: "250px",
      },
      {
        header: "Priority",
        accessor: "priority",
        sortable: true,
        searchable: true,
        minWidth: "150px",
        Cell: (val: string) => <Badge status={val || "N/A"} />,
      },
      {
        header: "Created",
        accessor: "createdDate",
        sortable: true,
        searchable: true,
        minWidth: "200px",

        Cell: (val) => {
          const { date, time } = formatDateTimeObject(Number(val));
          return (
            <Box display="flex" flexDirection="column">
              <Typography>{date}</Typography>
              <Typography color="secondaryText" size="xSmall">
                {time}
              </Typography>
            </Box>
          );
        },
      },
      {
        header: "Updated",
        accessor: "updatedDate",
        sortable: true,
        searchable: true,
        minWidth: "200px",
        Cell: (val) => {
          const { date, time } = formatDateTimeObject(Number(val));
          return (
            <Box display="flex" flexDirection="column">
              <Typography>{date}</Typography>
              <Typography color="secondaryText" size="xSmall">
                {time}
              </Typography>
            </Box>
          );
        },
      },
      {
        header: "Contact",
        accessor: "contact",
        sortable: true,
        searchable: true,
        minWidth: "200px",
      },
    ],
    [],
  );

  return (
    <Table
      columns={columns}
      data={tickets}
      searchTerm={searchTerm}
      defaultSortKey="ticketNumber"
      defaultSortOrder="asc"
      showScroll={true}
      emptyText={`No tickets `}
    />
  );
};
export default TicketsTable;
