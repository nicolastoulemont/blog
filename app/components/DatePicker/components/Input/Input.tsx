import { forwardRef } from "react"
import { useDatePicker } from "../Provider"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, placeholder, ...props }, ref) {
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
    <div className="flex flex-col text-left">
      <label className="mb-1 block text-sm font-medium" htmlFor="datepicker-input">
        {label}
      </label>
      <input
        ref={ref}
        type="text"
        readOnly
        value={state.value ? formatDate(state.value) : ""}
        className="border-1 rounded-lg border-gray-300 px-3 py-2 text-sm"
        id="datepicker-input"
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
})
