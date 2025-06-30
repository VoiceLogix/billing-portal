export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 0) return "";

  if (cleaned.length <= 3) return `+${cleaned}`;
  return `+${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
};

export const contactTypes = [
  { label: "Billing", value: 0 },
  { label: "Other", value: 1 },
  { label: "System", value: 2 },
];

export const LanguageTypes = [{ label: "US English", value: "en_US" }];
