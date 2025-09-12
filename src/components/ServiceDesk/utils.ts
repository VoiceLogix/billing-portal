import { TicketDetailsAttachment } from "../../types/TicketDetailsInterface";
import { Ticket } from "../../types/TicketInterface";
import { NotificationProps } from "../UI/Notification/Notification";
import { AttachmentFile, TicketData, TicketPriority } from "./types";

type TicketNotificationParams = {
  isCreateTicketSuccess: boolean;
  createTicketError: boolean;
  createTicketErrorMessage: unknown;
  setNotification: (notification: NotificationProps) => void;
};

export const handleTicketNotification = ({
  isCreateTicketSuccess,
  createTicketError,
  createTicketErrorMessage,
  setNotification,
}: TicketNotificationParams) => {
  if (isCreateTicketSuccess) {
    setNotification({
      type: "success",
      message: "Ticket created successfully",
      showNotification: true,
    });
  }

  if (createTicketError) {
    setNotification({
      type: "error",
      message:
        typeof createTicketErrorMessage === "object" &&
        createTicketErrorMessage !== null &&
        "message" in createTicketErrorMessage
          ? (createTicketErrorMessage as { message: string }).message
          : "Failed to create ticket",
      showNotification: true,
    });
  }
};

export const getErrorMessage = (err: unknown): string | undefined => {
  if (!err) return undefined;

  // string error
  if (typeof err === "string") return err;

  // Error instance
  if (err instanceof Error) return err.message;

  // axios-style or shaped object { message } or { data: { message } }
  if (typeof err === "object" && err !== null) {
    // @ts-ignore - general access
    return err.message ?? (err as any).data?.message;
  }

  return undefined;
};

export const Time_Selection: string[] = [
  "All",
  "Today",
  "Yesterday",
  "This Week",
  "This Month",
  "This Quarter",
  "This Year",
  "Last Week",
  "Last Month",
  "Last Quarter",
  "Last Year",
];

export const incidentTypes = [
  "Pre-Sales",
  "Marketing",
  "Installation",
  "Shipping",
  "Product Issues",
  "Shipping Issues",
  "Service Outage",
  "Service Request",
  "Information Request",
  "Accounts Receivable",
  "Accounts Payable",
  "Application Access",
  "General",
];

export const incidentSubTypes = [
  "Lead Generation",
  "Cold-Calling",
  "Qualification",
];

// Shared utility functions for incident category management
export const getIncidentCategories = (ticketClassifications: any[]) => {
  const allowedIncidentCategories = [
    "Pre-sales",
    "Marketing",
    "Installation",
    "Shipping",
    "Product Issues",
    "Shipping Issues",
    "Service Outage",
    "Service Request",
    "Information Request",
    "Accounts Receivable",
    "Accounts Payable",
    "Application Access",
    "General",
  ];

  if (!ticketClassifications) return allowedIncidentCategories;
  const fromApi = ticketClassifications.map(
    (classification: any) => classification.incidentType,
  );
  return allowedIncidentCategories.filter((category) =>
    fromApi.includes(category),
  );
};

export const getIncidentSubCategories = (
  ticketClassifications: any[],
  selectedIncidentType: string,
) => {
  if (!ticketClassifications || !selectedIncidentType) return [];
  const selectedCategory = ticketClassifications.find(
    (classification: any) =>
      classification.incidentType === selectedIncidentType,
  );
  return selectedCategory
    ? selectedCategory.incidentSubTypeList.map(
        (subType: any) => subType.incidentSubType,
      )
    : [];
};

export const getClassificationId = (
  ticketClassifications: any[],
  incidentType: string,
  incidentSubType: string,
) => {
  if (!ticketClassifications || !incidentType || !incidentSubType)
    return undefined;

  const selectedCategory = ticketClassifications.find(
    (classification: any) => classification.incidentType === incidentType,
  );

  if (!selectedCategory) return undefined;

  const selectedSubType = selectedCategory.incidentSubTypeList.find(
    (subType: any) => subType.incidentSubType === incidentSubType,
  );

  return selectedSubType ? selectedSubType.ticketClassificationId : undefined;
};

export const addresses = ["Address 1", "Address 2", "Address 3"];
export const Filter_Selection = [
  {
    name: "Priority",
    options: [
      { label: "All", value: "all" },
      { label: "Critical", value: "critical" },
      { label: "High", value: "high" },
      { label: "Medium", value: "medium" },
      { label: "Low", value: "low" },
    ],
  },

  {
    name: "Status",
    options: [
      { label: "All", value: "all" },
      { label: "New", value: "new" },
      { label: "Open", value: "open" },
      { label: "Closed", value: "closed" },
    ],
  },

  {
    name: "Flag",
    options: [{ label: "Escalated", value: "escalated" }],
  },
];

export const attachments = [
  "Screenshot_1.png",
  "Screenshot_2.png",
  "Report_Q1.pdf",
  "Budget_2025.xlsx",
  "User_Data.csv",
  "Presentation_Slides.pptx",
  "Contract_Agreement.docx",
  "System_Logs.txt",
  "Invoice_1123.odt",
];

export function splitAttachmentsByType(files: TicketDetailsAttachment[]) {
  const imageExtensions = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".bmp",
    ".svg",
  ];

  const images: TicketDetailsAttachment[] = [];
  const others: TicketDetailsAttachment[] = [];

  for (const file of files) {
    if (!file) continue; // Skip empty strings
    const ext = file.filename
      .slice(file.filename.lastIndexOf("."))
      .toLowerCase();
    if (imageExtensions.includes(ext)) {
      images.push(file);
    } else {
      others.push(file);
    }
  }

  return { images, others };
}

export function getImageBase64Previews(
  imageAttachments: TicketDetailsAttachment[],
) {
  return imageAttachments.map((attachment) => {
    return {
      name: attachment.filename,
      image: attachment.presignedUrl,
    };
  });
}

// Function to replace cid: references with actual URLs
export const replaceCidWithUrls = (
  htmlContent: string,
  inlineContentIds: Record<string, string> | undefined,
): string => {
  if (!inlineContentIds) return htmlContent;

  let processedContent = htmlContent;

  // Replace cid: references with actual URLs
  Object.entries(inlineContentIds).forEach(([cidId, url]) => {
    const cidPattern = new RegExp(`cid:${cidId}`, "g");
    processedContent = processedContent.replace(cidPattern, url);
  });

  return processedContent;
};

export const processHtmlForBlockImages = (htmlContent: string): string => {
  return htmlContent?.replace(
    /<img([^>]*src=["'][^"']*["'][^>]*)>/gi,
    '<div style="margin: 8px 0; display: block;"><img$1 style="display: block; max-width: 100%; height: auto; border-radius: 4px;"></div>',
  );
};

// Function to style links
export const processHtmlForStyledLinks = (htmlContent: string): string => {
  return htmlContent?.replace(/<a([^>]*?)>/gi, (match, attributes) => {
    // Check if target attribute exists
    const hasTarget = /target\s*=/i.test(attributes);
    const hasStyle = /style\s*=/i.test(attributes);

    let result = "<a" + attributes;

    // Add target="_blank" only if it doesn't exist
    if (!hasTarget) {
      result += ' target="_blank"';
    }

    // Add styling only if it doesn't exist
    if (!hasStyle) {
      result +=
        ' style="color: #0066cc; text-decoration: underline; cursor: pointer;"';
    }

    result += ">";
    return result;
  });
};

export const processHtmlContent = (
  htmlContent: string,
  inlineContentIds: Record<string, string> | undefined,
): string => {
  let processed = replaceCidWithUrls(htmlContent, inlineContentIds);
  processed = processHtmlForBlockImages(processed);
  processed = processHtmlForStyledLinks(processed);
  return processed;
};
export const getDateRangeForTimeSelection = (timeSelection: string) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  switch (timeSelection) {
    case "Today":
      return {
        start: today.getTime(),
        end: now.getTime(),
      };
    case "Yesterday":
      return {
        start: yesterday.getTime(),
        end: today.getTime(),
      };
    case "This Week":
      const thisWeekStart = new Date(
        today.getTime() - today.getDay() * 24 * 60 * 60 * 1000,
      );
      return {
        start: thisWeekStart.getTime(),
        end: now.getTime(),
      };
    case "This Month":
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      return {
        start: thisMonthStart.getTime(),
        end: now.getTime(),
      };
    case "This Quarter":
      const quarterMonth = Math.floor(now.getMonth() / 3) * 3;
      const thisQuarterStart = new Date(now.getFullYear(), quarterMonth, 1);
      return {
        start: thisQuarterStart.getTime(),
        end: now.getTime(),
      };
    case "This Year":
      const thisYearStart = new Date(now.getFullYear(), 0, 1);
      return {
        start: thisYearStart.getTime(),
        end: now.getTime(),
      };
    case "Last Week":
      const lastWeekEnd = new Date(
        today.getTime() - today.getDay() * 24 * 60 * 60 * 1000,
      );
      const lastWeekStart = new Date(
        lastWeekEnd.getTime() - 7 * 24 * 60 * 60 * 1000,
      );
      return {
        start: lastWeekStart.getTime(),
        end: lastWeekEnd.getTime(),
      };
    case "Last Month":
      const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
      const lastMonthYear =
        now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
      const lastMonthStart = new Date(lastMonthYear, lastMonth, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1);
      return {
        start: lastMonthStart.getTime(),
        end: lastMonthEnd.getTime(),
      };
    case "Last Quarter":
      const currentQuarter = Math.floor(now.getMonth() / 3);
      const lastQuarter = currentQuarter === 0 ? 3 : currentQuarter - 1;
      const lastQuarterYear =
        currentQuarter === 0 ? now.getFullYear() - 1 : now.getFullYear();
      const lastQuarterStart = new Date(lastQuarterYear, lastQuarter * 3, 1);
      const lastQuarterEnd = new Date(now.getFullYear(), currentQuarter * 3, 1);
      return {
        start: lastQuarterStart.getTime(),
        end: lastQuarterEnd.getTime(),
      };
    case "Last Year":
      const lastYearStart = new Date(now.getFullYear() - 1, 0, 1);
      const lastYearEnd = new Date(now.getFullYear(), 0, 1);
      return {
        start: lastYearStart.getTime(),
        end: lastYearEnd.getTime(),
      };
    default:
      return null; // "All" or unknown selection
  }
};

export const filterTicketsByTime = (
  tickets: Ticket[],
  timeSelection: string,
): Ticket[] => {
  if (timeSelection === "All") {
    return tickets;
  }

  const dateRange = getDateRangeForTimeSelection(timeSelection);
  if (!dateRange) {
    return tickets;
  }

  return tickets.filter((ticket) => {
    const created = new Date(ticket.createdDate).getTime();
    return created >= dateRange.start && created <= dateRange.end;
  });
};

export interface ParsedFilterCriteria {
  priority: string[];
  status: string[];
  flag: string[];
}

const parseSelectedFilters = (
  selectedFilters: string[],
): ParsedFilterCriteria => {
  const criteria: ParsedFilterCriteria = {
    priority: [],
    status: [],
    flag: [],
  };

  // Track if "all" is selected for each category
  const hasAllSelected = {
    priority: false,
    status: false,
    flag: false,
  };

  selectedFilters.forEach((filter) => {
    const [section, value] = filter.split("-");

    switch (section?.toLowerCase()) {
      case "priority":
        if (value === "all") {
          hasAllSelected.priority = true;
        } else if (value) {
          criteria.priority.push(value);
        }
        break;
      case "status":
        if (value === "all") {
          hasAllSelected.status = true;
        } else if (value) {
          criteria.status.push(value);
        }
        break;
      case "flag":
        if (value) {
          criteria.flag.push(value);
        }
        break;
    }
  });

  // If "all" is selected for a category, clear the specific filters for that category
  // This means "show all items for this category"
  if (hasAllSelected.priority) {
    criteria.priority = [];
  }
  if (hasAllSelected.status) {
    criteria.status = [];
  }
  // Note: Flag category doesn't have an "all" option

  return criteria;
};

export const filterTicketsByFilters = (
  tickets: Ticket[],
  selectedFilters: string[],
): Ticket[] => {
  // If no filters are selected, return all tickets
  if (!selectedFilters || selectedFilters.length === 0) {
    return tickets;
  }

  // Parse the selected filters into structured criteria
  const criteria = parseSelectedFilters(selectedFilters);

  return tickets.filter((ticket) => {
    // Priority filter - if any priority filters are selected, ticket must match one of them
    if (criteria.priority.length > 0) {
      const ticketPriority = ticket.priority?.toLowerCase();

      if (!ticketPriority || !criteria.priority.includes(ticketPriority)) {
        return false;
      }
    }

    // Status filter - if any status filters are selected, ticket must match one of them
    if (criteria.status.length > 0) {
      const ticketStatus = ticket.status?.toLowerCase();
      if (!ticketStatus || !criteria.status.includes(ticketStatus)) {
        return false;
      }
    }

    // Flag filter - if escalated filter is selected, ticket must have flag = true
    if (criteria.flag.length > 0) {
      if (criteria.flag.includes("escalated") && !ticket.isEscalated) {
        return false;
      }
    }

    // If ticket passes all selected filters, include it
    return true;
  });
};

export const applyAllFilters = (
  tickets: Ticket[],
  timeSelection: string,
  selectedFilters: string[],
): Ticket[] => {
  let filteredTickets = filterTicketsByTime(tickets, timeSelection);
  filteredTickets = filterTicketsByFilters(filteredTickets, selectedFilters);
  return filteredTickets;
};

const currentYear = new Date().getFullYear();
const lastYear = currentYear - 1;

// Helper to get a timestamp for a given year, month, day
function getTimestamp(year: number, month: number, day: number) {
  return new Date(year, month - 1, day).getTime();
}
