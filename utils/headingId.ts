export function generateHeadingId(string) {
  return new String(string)
    .toLowerCase()
    .replace(/[^a-zA-Z ]/g, '')
    .replace(/\s/g, '-')
}

export function getType(heading: string) {
  if (heading.startsWith('######')) return 'h6'
  if (heading.startsWith('#####')) return 'h5'
  if (heading.startsWith('####')) return 'h4'
  if (heading.startsWith('###')) return 'h3'
  if (heading.startsWith('##')) return 'h2'
  if (heading.startsWith('#')) return 'h1'
}
