// Conflicts due to the different number of days per month
export const handleMonthChange = (currentDate: Date, nextMonthIndex: number) => {
  const nextDate = new Date(currentDate)

  nextDate.setMonth(nextMonthIndex)

  /**
   * If for some reason the new nextDate object getMonth() method
   * doesn't return the same monthIndex as the one given then
   * there was a date conflict, for example when moving from
   * the 31st of March to the 28th of February
   */
  if (nextMonthIndex !== nextDate.getMonth()) {
    // This trick allows us to get the last day of the targeted month
    return new Date(currentDate.getFullYear(), nextMonthIndex + 1, 0)
  } else {
    return nextDate
  }
}
