import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers'

// Shiki transformers for fenced code blocks. A `title="Accordion.Root.tsx"`
// meta names the file in the block's tab, and a trailing `// [!code ++]`,
// `// [!code --]` or `// [!code highlight]` comment marks its line.
export default [title(), transformerNotationDiff(), transformerNotationHighlight()]

function title() {
  return {
    name: 'title',
    pre(node) {
      const value = /\btitle="([^"]+)"/.exec(this.options.meta?.__raw ?? '')?.[1]
      if (value) node.properties.dataTitle = value
    },
  }
}
