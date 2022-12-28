export const currentYear = new Date().getFullYear()

export function getYearsRange(
  from: number = currentYear - 80,
  to: number = currentYear + 80
) {
  const years: number[] = []

  for (let year = from; year <= to; year += 1) {
    years.push(year)
  }

  return years
}
