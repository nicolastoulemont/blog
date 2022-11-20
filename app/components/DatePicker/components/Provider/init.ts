import { DatePickerProviderProps, State } from "./Provider.types"

export function init({ value }: Partial<DatePickerProviderProps>): State {
  const calendarDate = value ?? new Date()
  return {
    /**
     * Controller for the different views shown to the user
     */
    view: "days",
    /** The value given back to the consumer of the DatePicker */
    value,
    /**
     * Used as an internal date reference to populate the calendar UI
     * and move across years and months without impacting the value selected itself
     */
    calendarDate,
    /**
     * Used to manage animation directions
     */
    slideDir: "none",
    /**
     * Used to manage fill the year view
     */
    yearRange: [new Date().getFullYear() - 2, new Date().getFullYear() + 9],
  }
}
