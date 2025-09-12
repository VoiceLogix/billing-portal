export interface StatusResponse {
  resultSize: number;
  statuses: Status[];
  status: string;
}

export interface Status {
  id: string;
  statusName: string;
  reasons: Reason[];
  visibility: string;
  category: string;
  isDashboardConfigured: boolean;
  isReliefStatus: boolean;
  isReliefSlaInclusionStatus: boolean;
  isResponseSlaInclusionStatus: boolean;
  isResolutionSlaInclusionStatus: boolean;
}

export interface Reason {
  id: string;
  value: string;
  visibility: string;
  isDefault: boolean;
  successful: boolean;
  lstValidationErrorInfo: any[]; // could be typed if structure known
  lstValidationSkipInfo: any[]; // same here
}
