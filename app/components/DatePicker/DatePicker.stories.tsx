import type { ComponentMeta } from "@storybook/react"
import { useState } from "react"

import { DatePicker } from "./DatePicker"

const metas: ComponentMeta<typeof DatePicker> = {
  title: "DatePicker",
  component: DatePicker,
}

export default metas

export const Default = ({}) => {
  const [value, setValue] = useState<Date>()

  return (
    <div className="relative w-[300px]">
      <DatePicker label="Your birthday" placeholder="Pick a date" locale="en-GB" value={value} onChange={setValue} />
    </div>
  )
}
