import { DatePickerProps } from "./DatePicker.types"
import { DatePickerMobile, DatePickerDesktop, DatePickerProvider } from "./components"
import { useWindowSize } from "react-use"
import { Input } from "./components/Input"

export function DatePicker(props: DatePickerProps) {
  const { width } = useWindowSize()
  const { label } = props

  return (
    <DatePickerProvider {...props}>
      <div className="relative w-[300px] sm:w-[400px]">
        <Input label={label} />
        {width > 500 ? <DatePickerDesktop /> : <DatePickerMobile />}
      </div>
    </DatePickerProvider>
  )
}
