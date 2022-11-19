import { useState } from "react"
import { DatePicker } from "./DatePicker/DatePicker"

export const DatePickerDemo = () => {
  const [value, setValue] = useState<Date>(new Date())

  return (
    <div className="h-auto w-[300px]">
      <DatePicker label="Your birthday" placeholder="Pick a date" locale="en-GB" value={value} onChange={setValue} />
    </div>
  )
}
