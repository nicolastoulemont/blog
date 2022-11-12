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

  return <DatePicker label="Your birthday" locale="en-GB" value={value} onChange={setValue} />
}
