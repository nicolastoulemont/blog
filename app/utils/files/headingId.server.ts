export function getType(heading: string): HeadingType | undefined {
  if (heading.startsWith("######")) return "h6"
  if (heading.startsWith("#####")) return "h5"
  if (heading.startsWith("####")) return "h4"
  if (heading.startsWith("###")) return "h3"
  if (heading.startsWith("##")) return "h2"
  if (heading.startsWith("#")) return "h1"
}

export type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
