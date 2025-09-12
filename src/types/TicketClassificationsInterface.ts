export interface TicketClassificationResponse {
  ticketClassificationList: IncidentType[];
  accessDenied: boolean;
  successful: boolean;
  clientValidationErrorInfo: ClientValidationErrorInfo[];
}

export interface IncidentType {
  incidentTypeId: string;
  incidentType: string;
  incidentSubTypeList: IncidentSubType[];
}

export interface IncidentSubType {
  ticketClassificationId: string;
  incidentSubTypeId: string;
  incidentSubType: string;
  priority: number;
  visibility: number;
}

export interface ClientValidationErrorInfo {
  [key: string]: any;
}
