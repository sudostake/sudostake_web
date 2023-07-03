export const protectAgainstNaN = (value: number) => (isNaN(value) ? 0 : value)

// TODO work on this not precise enough
export function convertMicroDenomToDenom(
  value: number | string,
  decimals: number
): number {
  if (decimals === 0) return Number(value)

  // Calculate the number
  const res = protectAgainstNaN(Number(value) / Math.pow(10, decimals));

  // Seperate the number into num and decimal parts
  let parts = res.toString().split('.');

  // Remove the last digit from the decimal_part as this is rounded up
  // which is not the desired behaviour we want with very large numbers
  //
  // what this then implies is that max is not truly max and calculations
  // will leave dust behind
  let decimal_part = parts[1] ? parts[1].substring(0, parts[1].length - 1) : '0';
  return parseFloat([parts[0], '.', decimal_part].join(''))
}

export function convertDenomToMicroDenom(
  value: number | string,
  decimals: number
): string {
  if (decimals === 0) return `${value}`;

  let val = Number(value) * Math.pow(10, decimals);
  return val.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: decimals });
}
