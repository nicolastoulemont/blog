import type { Locale } from '../../DatePicker.types'
import { currentYear } from '../getYearsRange'

type Local = Locale

type Month = 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined

export function getMonthsName(local: Local = 'en-GB', month: Month = 'long') {
  const formatter = new Intl.DateTimeFormat(local, {
    month,
  })

  return Array(12)
    .fill(null)
    .map((_, index) => formatter.format(new Date(currentYear, index, 1)))
}
