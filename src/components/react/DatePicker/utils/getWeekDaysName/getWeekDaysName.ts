import type { Locale } from '../../DatePicker.types'

type WeekDay = 'long' | 'short' | 'narrow' | undefined

const thu = new Date(1970, 0, 1)
const fri = new Date(1970, 0, 2)
const sat = new Date(1970, 0, 3)
const sun = new Date(1970, 0, 4)
const mon = new Date(1970, 0, 5)
const tue = new Date(1970, 0, 6)
const wed = new Date(1970, 0, 7)

export function getWeekDaysName(locale: Locale = 'en-GB', weekday: WeekDay = 'long') {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday,
  })

  return [
    formatter.format(mon),
    formatter.format(tue),
    formatter.format(wed),
    formatter.format(thu),
    formatter.format(fri),
    formatter.format(sat),
    formatter.format(sun),
  ]
}
