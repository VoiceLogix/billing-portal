export interface TicketDetailsResponse {
  clientTicket: TicketDetails;
  accessDenied: boolean;
  successful: boolean;
  clientValidationErrorInfo: any[]; // can refine if schema is known
}

export interface TicketDetails {
  assigneeContactName?: string;
  ticketUpdateAction: number;
  ticketNumber: string;
  subject: string;
  description: string;
  status: string;
  classificationId: string;
  conversations: Conversation[];
  priority: string;
  incidentType: string;
  incidentSubType: string;
  createdByUsername: string;
  createdByFirstName: string;
  createdByLastName: string;
  isEscalated: boolean;
  isReliefSlaBreached: boolean;
  isResponseSlaBreached: boolean;
  isResolutionSlaBreached: boolean;
  createdDate: string; // ISO date string
  lastModifiedDate: string; // ISO date string
  attachments: TicketDetailsAttachment[];
  customAttributes: any[];
  createdBySubscriber: boolean;
  ticketAttributes: TicketAttributes;
  ticketStatusId: string;
  category: string;
  incidentTypeId: string;
  incidentSubTypeId: string;
  isClassificationInternalOrNone: boolean;
  partyRoleId: string;
  inlineContentIds?: Record<string, string>; // optional (only when inline content exists)
}

export interface TicketDetailsAttachment {
  id: string;
  filename: string;
  documentId: string;
  attachmentType: number;
  operationType: number;
  presignedUrl: string;
}

export interface TicketAttributes {
  emailInfo: EmailInfo;
  emailCreationInfo: Record<string, unknown>; // flexible for unknown keys
}

export interface EmailInfo {
  ccAddressList: string[];
  bccAddressList: string[];
}

export interface Conversation {
  id: string;
  conversation: string; // HTML content
  createdByUsername: string;
  createdDate: string; // ISO date string
  attachments: TicketDetailsAttachment[];
  isNotesReadByCurrentUser: boolean;
  isAttachmentPresent: boolean;
  inlineContentIds?: Record<string, string>; // optional (only when inline content exists)
}
