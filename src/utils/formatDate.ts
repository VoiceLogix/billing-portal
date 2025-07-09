export function formatDate(dateStr: string | number): string {
  if (!dateStr) return "--";
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export function formatDateRange(start: number, end: number, locale = "en-US") {
  if (!start || !end) return "";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const startDate = new Date(start);
  const endDate = new Date(end);

  const formatter = new Intl.DateTimeFormat(locale, options);
  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
}
