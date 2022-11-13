import { Calendar } from "./Calendar"
import { Input } from "./Input"
import { useDatePicker } from "./Provider"

export function DatePickerMobile() {
  const { label } = useDatePicker()
  return (
    <>
      <Input label={label} />
      <Calendar />
    </>
  )
}
