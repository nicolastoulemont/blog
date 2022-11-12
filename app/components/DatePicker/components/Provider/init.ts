import { DatePickerProps } from "../../DatePicker.types"
import { State } from "./Provider.types"

export function init({ value }: Partial<DatePickerProps>): State {
  const calendarDate = value ?? new Date()
  return {
    /**
     * Controller for the different views shown to the user
     */
    view: "days",
    /** The value given back to the consumer of the DatePicker */
    value,
    /**
     * Use as an internal date reference to populate the calendar UI
     * and move across years and months without impacting the value selected itself
     */
    calendarDate,
    slideDir: "none",
    yearRange: [new Date().getFullYear() - 2, new Date().getFullYear() + 9],
  }
}
