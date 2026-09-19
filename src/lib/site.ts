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

interface UiStrings {
  published: string
  reading: string
  contents: string
  more: string
  previous: string
  next: string
  translation: string
  copy: string
  copied: string
  copyFailed: string
  searchPosts: string
  searchPlaceholder: string
  searchHelp: string
  closeSearch: string
  noPosts: string
  posts: string
  adjacent: string
}
export const UI_STRINGS: Record<SiteLocale, UiStrings> = {
  en: {
    published: 'Published',
    reading: 'Reading time',
    contents: 'On this page',
    more: 'More on',
    previous: 'Previous',
    next: 'Next',
    translation: 'This post is also available in',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Copy failed. Try again',
    adjacent: 'Adjacent posts',
    searchPosts: 'Search posts',
    searchPlaceholder: 'Search by title or topic…',
    searchHelp: '↑ ↓ to select · Enter to open · Esc to close',
    closeSearch: 'Close search',
    noPosts: 'No posts found.',
    posts: 'Posts',
  },
  fr: {
    published: 'Publié le',
    reading: 'Temps de lecture',
    contents: 'Sur cette page',
    more: 'À lire aussi sur',
    previous: 'Précédent',
    next: 'Suivant',
    translation: 'Cet article est aussi disponible en',
    copy: 'Copier',
    copied: 'Copié',
    copyFailed: 'Échec de la copie. Réessayer',
    adjacent: 'Articles adjacents',
    searchPosts: 'Rechercher un article',
    searchPlaceholder: 'Rechercher par titre ou sujet…',
    searchHelp: '↑ ↓ pour sélectionner · Entrée pour ouvrir · Échap pour fermer',
    closeSearch: 'Fermer la recherche',
    noPosts: 'Aucun article trouvé.',
    posts: 'Articles',
  },
}
