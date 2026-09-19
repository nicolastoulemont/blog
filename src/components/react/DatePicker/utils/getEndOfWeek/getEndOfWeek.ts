export function getEndOfWeek(date: Date) {
  const value = new Date(date)
  const day = value.getDay()
  const clampToLastDay = 7 - day

  if (day !== 0) {
    value.setDate(value.getDate() + clampToLastDay)
  }

  return value
}
