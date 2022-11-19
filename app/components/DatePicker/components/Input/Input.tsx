import { forwardRef, ReactNode } from "react"
import { useDatePicker } from "../Provider"

export const InputContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col text-left">{children}</div>
)

export const InputLabel = ({ label }: { label: string }) => (
  <label className="mb-1 block text-sm font-medium" htmlFor="datepicker-input">
    {label}
  </label>
)

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input(
  { placeholder, ...props },
  ref
) {
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
    <input
      ref={ref}
      type="text"
      readOnly
      value={state.value ? formatDate(state.value) : ""}
      className="border-1 w-full rounded-lg border-gray-300 px-3 py-2 text-sm text-slate-700"
      id="datepicker-input"
      placeholder={placeholder}
      {...props}
    />
  )
})
