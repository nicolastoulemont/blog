// Bisextil edge cases
export const handleYearChange = (currentDate: Date, nextYear: number) => {
  const nextDate = new Date(currentDate)

  nextDate.setFullYear(nextYear)

  /**
   * If for some reason the new nextDate object getMonth() method
   * doesn't return the same monthIndex as the current date
   * there was a date conflict, for example when moving from
   * the 29th of February 2020 to the 28th of February 2021
   */
  if (currentDate.getMonth() !== nextDate.getMonth()) {
    // This trick allow us to the get the last day of the targeted month
    return new Date(nextYear, currentDate.getMonth() + 1, 0)
  } else {
    return nextDate
  }
}
