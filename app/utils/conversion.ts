import { MAX_DECIMALS_PRECISION } from "./constants";

export const protectAgainstNaN = (value: number) => (isNaN(value) ? 0 : value)

/**
 * 
 * @param value 
 * @param decimals 
 * @returns string
 * 
 * If decimals > MAX_DECIMALS_PRECISION, 
 *    replace the number string from the end with 0s by the precision difference
 */
function normalize_number_string(value: string,
  decimals: number): string {
  let precision_diff = decimals - MAX_DECIMALS_PRECISION;
  if (precision_diff > 0) {
    value = value.substring(0, value.length - precision_diff) + '0'.repeat(precision_diff);
  }

  return value;
}

export function convertMicroDenomToDenom(
  value: string,
  decimals: number
): number {
  value = normalize_number_string(value, decimals);
  if (decimals === 0) return Number(value)
  return protectAgainstNaN(Number(value) / Math.pow(10, decimals))
}

export function convertDenomToMicroDenom(
  value: number | string,
  decimals: number
): string {
  if (decimals === 0) return `${value}`;

  let val = Number(value) * Math.pow(10, decimals);
  return val.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: decimals });
}


// https://medium.com/@vipinc.007/javascript-function-translate-seconds-into-days-hours-minutes-and-seconds-91080a8b5383
export function secondsToDhms(date: Date): string | 'EXPIRED' {
  let diff = date.getTime() - Date.now();

  if (diff <= 0) {
    return 'EXPIRED';
  }

  let seconds = diff / 1000;
  var d = Math.floor(seconds / (3600 * 24))
  var h = Math.floor((seconds % (3600 * 24)) / 3600)
  var m = Math.floor((seconds % 3600) / 60)
  var s = Math.floor(seconds % 60)

  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : ""
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : ""
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : ""
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : ""

  return dDisplay + hDisplay + mDisplay + sDisplay
}