// Turns <Tabs> around fenced code blocks into a tab list, one tab per block,
// labelled by the block's title or language. The first tab starts selected.
// Without JavaScript the tab list hides and every block shows.
export default function tabs() {
  return (tree) => {
    let count = 0

    function visit(node) {
      node.children?.forEach((child, index) => {
        if (child.type === 'mdxJsxFlowElement' && child.name === 'Tabs') {
          count += 1
          node.children[index] = group(blocks(child), count)
        } else {
          visit(child)
        }
      })
    }
    visit(tree)
  }
}

function blocks(node) {
  const children = node.children.filter(
    (child) => !(child.type === 'text' && !child.value.trim()),
  )
  if (!children.length || children.some((child) => child.tagName !== 'pre')) {
    throw new Error('<Tabs> only takes fenced code blocks')
  }
  return children
}

function group(pres, count) {
  const id = (kind, index) => `tabs-${count}-${kind}-${index + 1}`
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: ['tabs'] },
    children: [
      {
        type: 'element',
        tagName: 'div',
        properties: { role: 'tablist' },
        children: pres.map((pre, index) => ({
          type: 'element',
          tagName: 'button',
          properties: {
            type: 'button',
            role: 'tab',
            id: id('tab', index),
            ariaControls: id('panel', index),
            ariaSelected: String(index === 0),
            tabIndex: index === 0 ? 0 : -1,
          },
          children: [
            {
              type: 'text',
              value: pre.properties.dataTitle ?? pre.properties.dataLanguage,
            },
          ],
        })),
      },
      ...pres.map((pre, index) => ({
        type: 'element',
        tagName: 'div',
        properties: {
          role: 'tabpanel',
          id: id('panel', index),
          ariaLabelledBy: id('tab', index),
          dataSelected: index === 0 ? '' : undefined,
        },
        children: [pre],
      })),
    ],
  }
}
