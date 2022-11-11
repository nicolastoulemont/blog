import { getStartOfWeek } from "../getStartOfWeek"
import { getEndOfWeek } from "../getEndOfWeek"

export function getMonthDays(month: Date): Date[][] {
  const currentMonth = month.getMonth()
  const startOfMonth = new Date(month.getFullYear(), currentMonth, 1)
  const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0)
  const endDate = getEndOfWeek(endOfMonth)
  const date = getStartOfWeek(startOfMonth)
  const weeks: Date[][] = []

  while (date <= endDate) {
    const days: Date[] = []

    for (let i = 0; i < 7; i += 1) {
      days.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }

    weeks.push(days)
  }

  // // Ensure that the DayPicker view always show 6 weeks worth of days
  // Bisextil years
  if (weeks.length === 4) {
    const fifthWeek = generateWeek(endDate)
    const sixthWeek = generateWeek(fifthWeek[fifthWeek.length - 1])

    weeks.push(fifthWeek)
    weeks.push(sixthWeek)
  } else if (weeks.length < 6) {
    const week = generateWeek(endDate)

    weeks.push(week)
  }

  return weeks
}

function generateWeek(startDate: Date) {
  const week: Date[] = []

  for (let i = 1; i < 8; i += 1) {
    const day = new Date(startDate)

    day.setDate(day.getDate() + i)
    week.push(new Date(day))
  }

  return week
}
