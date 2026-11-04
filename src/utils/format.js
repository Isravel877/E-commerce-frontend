export function formatPrice(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "Price unavailable";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function getOriginalPrice(product) {
  return Number(product?.originalPrice ?? product?.original_price ?? 0);
}
