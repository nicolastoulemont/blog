import type { SiteLocale } from './site'

export function formatDisplayDate(input: Date | string, locale: SiteLocale) {
  const date = typeof input === 'string' ? new Date(input) : input
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
