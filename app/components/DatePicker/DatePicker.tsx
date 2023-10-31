import { DatePickerProps } from './DatePicker.types'
import { DatePickerMobile, DatePickerDesktop, DatePickerProvider } from './components'

import { useIsMobile } from './utils'

export function DatePicker(props: DatePickerProps) {
  const isMobile = useIsMobile()

  return (
    <DatePickerProvider {...props}>
      {isMobile ? <DatePickerMobile /> : <DatePickerDesktop />}
    </DatePickerProvider>
  )
}
