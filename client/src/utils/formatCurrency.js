export function formatCurrency(amount = 0) {
  const numberAmount = Number(amount) || 0;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numberAmount);
}

export function formatPercentage(value = 0) {
  const numberValue = Number(value) || 0;

  return `${numberValue.toFixed(1)}%`;
}