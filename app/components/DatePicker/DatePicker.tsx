import { DatePickerProps } from "./DatePicker.types"
import { DatePickerMobile, DatePickerDesktop, DatePickerProvider } from "./components"
import { useWindowSize } from "react-use"

export function DatePicker(props: DatePickerProps) {
  const { width } = useWindowSize()

  return (
    <DatePickerProvider {...props}>{width > 500 ? <DatePickerDesktop /> : <DatePickerMobile />}</DatePickerProvider>
  )
}
