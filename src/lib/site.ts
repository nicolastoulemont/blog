export const SITE_URL = 'https://nicolastoulemont.dev'
export const SITE_TITLE = 'Nicolas Toulemont engineering blog'
export const SITE_DESCRIPTION =
  'Web development content about React, TypeScript, GraphQL, Node, and software architecture.'

export const SOCIAL_LINKS = {
  github: 'https://github.com/nicolastoulemont',
  twitter: 'https://twitter.com/n_toulemont',
} as const

export const LOCALE_LABELS = {
  en: 'English',
  fr: 'Francais',
} as const

export type SiteLocale = keyof typeof LOCALE_LABELS
