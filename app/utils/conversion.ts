export const protectAgainstNaN = (value: number) => (isNaN(value) ? 0 : value)

// TODO Still not accurate enough for really small numbers where EPSILON > 2^-52
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON
export function convertMicroDenomToDenom(
  value: number | string,
  decimals: number
): number {
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
export function secondsToDhms(date: Date) {
  let diff = date.getTime() - Date.now();
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