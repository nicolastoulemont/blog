export function getStartOfWeek(date: Date) {
  const value = new Date(date)
  const day = value.getDay() || 7
  const clampToFirstDay = day - 1

  if (day !== 1) {
    value.setHours(-24 * clampToFirstDay)
  }

  return value
}
