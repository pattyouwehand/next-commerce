export function formatCurrency(amount, currencyCode = "EUR"){

  try {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: currencyCode.toUpperCase()
    }).format(amount)
  } catch (error) {
    console.error("Invalid currency code:", currencyCode, error)
    return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`
  }
}