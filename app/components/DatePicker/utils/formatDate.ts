import type { Locale } from "../DatePicker.types"

/**
 * @docs [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
 * the en-GB is one of the formats that return DD/MM/YYYY
 */
export function formatDate(day: Date, locale: Locale, ...args: Intl.DateTimeFormatOptions[]) {
  const formatter = new Intl.DateTimeFormat(locale, ...args)

  return formatter.format(day)
}
