export interface Ticket {
  ticketNumber: string;
  subject: string;
  description: string;
  status: string;
  isEscalated: boolean;
  isReliefSlaBreached: boolean;
  isResponseSlaBreached: boolean;
  isResolutionSlaBreached: boolean;
  priority: string;
  accName: string;
  currentActionType: string;
  accountNumber: string;
  departmentName: string;
  lastModifiedDate: string; // ISO timestamp
  fullName: string;
  createdDate: string; // ISO timestamp
  hasAttachment: boolean;
  createdByContactName: string;
  category: string;
  incidentType: string;
  incidentSubType: string;
}
export interface TicketResponse {
  resultSize: number;
  addOnResultCount: number;
  parentResultCount: number;
  clientTickets: Ticket[];
  accessDenied: boolean;
  successful: boolean;
  clientValidationErrorInfo: any[]; // refine if structure is known
}
