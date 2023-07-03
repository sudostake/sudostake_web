export const protectAgainstNaN = (value: number) => (isNaN(value) ? 0 : value)

export function convertMicroDenomToDenom(
  value: number | string,
  decimals: number
): number | string {
  if (decimals === 0) return Number(value)

  return protectAgainstNaN(Number(value) / Math.pow(10, decimals))
}

export function convertDenomToMicroDenom(
  value: number | string,
  decimals: number
): number | string {
  if (decimals === 0) return Number(value);

  let val = Number(value) * Math.pow(10, decimals);
  return val.toLocaleString('fullwide', { useGrouping: false });
}

