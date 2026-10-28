export const CATEGORY_NAMES = [
  'Animations',
  'Architecture',
  'Career',
  'Data Structures',
  'GraphQL',
  'Guardrails',
  'OSS',
  'Performance',
  'Product Engineering',
  'React',
  'Scaling Teams',
] as const

export type CategoryName = (typeof CATEGORY_NAMES)[number]

export const CATEGORY_SLUGS = {
  React: 'react',
  GraphQL: 'graphql',
  'Data Structures': 'data',
  Animations: 'animations',
  Career: 'career',
  Architecture: 'architecture',
  Guardrails: 'guardrails',
  OSS: 'oss',
  Performance: 'performance',
  'Product Engineering': 'product-engineering',
  'Scaling Teams': 'scaling-teams',
} as const satisfies Record<CategoryName, string>
export type CategorySlug = (typeof CATEGORY_SLUGS)[CategoryName]
