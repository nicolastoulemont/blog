import { useDatePicker } from "../Provider"

interface InputProps {
  label: string
}

export function Input({ label }: InputProps) {
  const { state } = useDatePicker()

  const formatDate = (date: Date) => {
    /**
     * Using the built-in Intl feature of the browser:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
     */
    const formatter = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    return formatter.format(date)
  }

  return (
    <div className="flex flex-col">
      <label className="block" htmlFor="datepicker-input">
        {label}
      </label>
      <input
        type="text"
        readOnly
        value={state.value ? formatDate(state.value) : ""}
        className="rounded-lg px-2 py-1 text-sm"
        id="datepicker-input"
      />
    </div>
  )
}
