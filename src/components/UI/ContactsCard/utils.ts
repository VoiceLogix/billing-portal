import { ClientCommunicationDTO } from "../../../types/ProfileDetailsInterface";

export const getContactType = (contactType: number) => {
  switch (contactType) {
    case 0:
      return "Billing";
    case 2:
      return "System";
    case 1:
      return "Other";
    default:
      return "Other";
  }
};

export const formatPhoneNumber = (number: string): string => {
  const clean = number.replace(/[^\d+]/g, "");
  const match = clean.match(/^\+?(\d{2,3})(\d+)$/);
  if (match) {
    const [, cc, rest] = match;
    return `+${cc} ${rest}`;
  }
  return "";
};

export const getContactEmailAndNumbers = (
  communicationPoint: ClientCommunicationDTO[],
) => {
  const emailId =
    communicationPoint.find((p) => p.type === "EMAIL")?.value ?? "";

  const contactNumbersArr = communicationPoint
    .filter((p) => ["PHONE", "APHONE", "CPHONE"].includes(p.type))
    .map((p) => formatPhoneNumber(p.value))
    .filter((fmt) => fmt !== "");

  const contactNumbers = contactNumbersArr.join(", ");

  return { emailId, contactNumbers };
};
