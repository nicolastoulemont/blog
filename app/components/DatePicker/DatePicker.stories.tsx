import type { ComponentMeta } from "@storybook/react"
import { DatePicker } from "./DatePicker"

const metas: ComponentMeta<typeof DatePicker> = {
  title: "DatePicker",
  component: DatePicker,
}

export default metas

export const Default = ({}) => <DatePicker />
