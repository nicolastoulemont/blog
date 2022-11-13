export type Locale = "en-GB" | "fr-FR"

export interface DatePickerProps {
  label: string
  placeholder?: string
  locale: Locale
  value: Date | undefined
  onChange: (date: Date) => void
}
