export const CATEGORY_NAMES = [
  'Animations',
  'Architecture',
  'Career',
  'Data Structures',
  'General',
  'GraphQL',
  'React',
] as const

export type CategoryName = (typeof CATEGORY_NAMES)[number]

export const CATEGORY_SLUGS = {
  React: 'react',
  GraphQL: 'graphql',
  'Data Structures': 'data',
  Animations: 'animations',
  Career: 'career',
  Architecture: 'architecture',
  General: 'general',
} as const satisfies Record<CategoryName, string>
export type CategorySlug = (typeof CATEGORY_SLUGS)[CategoryName]
