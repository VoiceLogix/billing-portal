export enum TicketPriority {
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 4,
}

export interface AttachmentFile {
  filename: string;
  fileContent: string; // base64 encoded
}

export interface AddTicket {
  subject: string;
  priority: TicketPriority;
  incidentType: string;
  incidentSubType: string;
  description: string;
  attachments: AttachmentFile[];
  address: string;
  cc: string;
  bcc: string;
}

export interface TicketData {
  ticketNumber: string;
  status: string;
  flag: boolean;
  incidentType: string;
  incidentSubType: string;
  priority: TicketPriority;
  createdDate: number;
  updatedDate: number;
  contact: string;
  subject: string;
  description?: string;
  address?: string;
  bcc?: string[];
  cc?: string[];
  attachments?: AttachmentFile[];
  assignedTo?: string;
  comments?: {
    name: string;
    description: string;
    date: number;
  };
}

// ticketNumber: "B1002",
//     status: "Open",
//     flag: true,
//     incidentType: "Product Issue",
//     incidentSubType: "Product Enhancement",
//     priority: "Critical",
//     createdDate: 1633036800000,
//     updatedDate: 1633123200000,
//     contact: "Kevin Macalister",
//     subject: "Issue with product X",
//     description: "There is a problem with product X that needs attention.",
//     attachments: [],
