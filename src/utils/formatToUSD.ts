export function formatToUSD(value: number | string): string {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return "$0.00";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(numValue);
}
