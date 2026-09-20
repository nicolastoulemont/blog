import rehypeMermaid from 'rehype-mermaid'

export default function mermaid(options) {
  const light = rehypeMermaid({ ...options, prefix: 'mermaid-light' })
  const dark = rehypeMermaid({
    ...options,
    prefix: 'mermaid-dark',
    mermaidConfig: { ...options.mermaidConfig, theme: 'dark' },
  })

  return async (tree, file) => {
    const darkTree = structuredClone(tree)
    await Promise.all([light(tree, file), dark(darkTree, file)])
    pair(tree, darkTree)
  }
}

function pair(light, dark) {
  light.children?.forEach((child, index) => {
    if (
      child.type === 'element' &&
      child.tagName === 'svg' &&
      child.properties.id?.startsWith('mermaid-light-')
    ) {
      light.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['mermaid'] },
        children: [child, dark.children[index]],
      }
    } else {
      pair(child, dark.children[index])
    }
  })
}
