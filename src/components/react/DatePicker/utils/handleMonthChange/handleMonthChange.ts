// Conflicts due to the differences in month number of days
export const handleMonthChange = (currentDate: Date, nextMonthIndex: number) => {
  const nextDate = new Date(currentDate)

  nextDate.setMonth(nextMonthIndex)

  /**
   * If for some reason the new nextDate object getMonth() method
   * doesn't return the same monthIndex as the one given then
   * there was a date conflict, for example when moving from
   * the 31 of march to the 28th of February
   */
  if (nextMonthIndex !== nextDate.getMonth()) {
    // This trick allow us to the get the last day of the targeted month
    return new Date(currentDate.getFullYear(), nextMonthIndex + 1, 0)
  } else {
    return nextDate
  }
}
