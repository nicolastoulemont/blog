import type { SiteLocale } from './site'

export function formatDisplayDate(input: Date | string, locale: SiteLocale) {
  const date = typeof input === 'string' ? new Date(input) : input
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function formatMonthYear(input: Date | string, locale: SiteLocale) {
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(typeof input === 'string' ? new Date(input) : input)
}
