import { Address } from "../../../types/SubscriberInfoInterface";
import { PaymentCardType } from "../../SVG/CardTypeSVG";

export type CardFormFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  cardType: PaymentCardType;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  addLine1?: string;
  addLine2?: string;
};

export const CARD_TYPES: PaymentCardType[] = [
  "visa",
  "mastercard",
  "amex",
  "discover",
];

export const cardValidationRules = {
  visa: {
    re: /^(?:4[0-9]{12}(?:[0-9]{3})?|4[0-9]{15}|4[0-9]{18})$/,
    example: "4xxx xxxx xxxx xxxx",
    maxLength: 19,
    cvvLength: 3,
  },
  mastercard: {
    re: /^(?:5[1-5][0-9]{14}|2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9]{2}|7(?:[0][0-1]|20))[0-9]{12})$/,
    example: "51xx xxxx xxxx xxxx",
    maxLength: 16,
    cvvLength: 3,
  },
  amex: {
    re: /^(?:3[47][0-9]{13})$/,
    example: "34x xxxxxx xxxxx",
    maxLength: 15,
    cvvLength: 4,
  },
  discover: {
    re: /^(?:6011[0-9]{12}|65[0-9]{14}|64[4-9][0-9]{13})$/,
    example: "6011 xxxx xxxx xxxx",
    maxLength: 16,
    cvvLength: 3,
  },
};

export const formatCardNumber = (value: string) => {
  const onlyDigits = value?.replace(/\D/g, "");
  return onlyDigits.match(/.{1,4}/g)?.join(" ") || "";
};

export function maskAccountNumber(input: string): string {
  if (!input) return "";
  const digits = input?.replace(/\D/g, "");
  if (digits?.length <= 3) {
    return digits;
  }

  const lastThree = digits.slice(-3);
  return `*** *** ${lastThree}`;
}

export function formatExpiryDate(month?: number, year?: number): string | null {
  if (!month || !year) return null;

  const mm = String(month).padStart(2, "0");
  const yy = String(year).slice(-2); // take last 2 digits
  return `${mm}/${yy}`;
}

export const formatExpiryInput = (value: string) => {
  const raw = value.replace(/\D/g, "");
  return raw.length >= 3 ? `${raw.slice(0, 2)}/${raw.slice(2, 4)}` : raw;
};

export const convertMMYYtoYYYYMM = (mmyy: string): string | null => {
  const [m, y] = mmyy.split("/");
  const yy = +y;
  if (!m || !y || isNaN(yy)) return null;

  const now = new Date().getFullYear();
  const base = now - (now % 100);
  const fullYear = yy < now % 100 ? base + 100 + yy : base + yy;
  return `${fullYear}-${m.padStart(2, "0")}`;
};

export const getCardNotification = (
  updateError: any,
  updatedsuccess: boolean,
  updatedpending: boolean,
  deleteError: any,
  deletePending: boolean,
  deleteSuccess: boolean,
): {
  notificationType: "error" | "success" | null;
  notificationMessage: string | null;
  showNotification: boolean;
} => {
  if (updatedpending || deletePending) {
    return {
      notificationType: null,
      notificationMessage: null,
      showNotification: false,
    };
  }
  if (updateError) {
    return {
      notificationType: "error",
      notificationMessage: updateError.message || "An error occurred",
      showNotification: true,
    };
  }

  if (updatedsuccess) {
    return {
      notificationType: "success",
      notificationMessage: "Payment profile created successfully",
      showNotification: true,
    };
  }

  if (deletePending) {
    return {
      notificationType: null,
      notificationMessage: null,
      showNotification: false,
    };
  }

  if (deleteError) {
    return {
      notificationType: "error",
      notificationMessage: deleteError.message || "An error occurred",
      showNotification: true,
    };
  }

  if (deleteSuccess) {
    return {
      notificationType: "success",
      notificationMessage: "Payment profile deleted successfully",
      showNotification: true,
    };
  }

  return {
    notificationType: null,
    notificationMessage: null,
    showNotification: false,
  };
};

export const getAddressString = (address: Address): string => {
  if (!address) {
    return "";
  }
  return [address.city, address.addLine1, address.addLine2]
    .filter(Boolean)
    .join(", ");
};
