// Wraps each lone image and Mermaid diagram in a numbered figure. The id lets
// prose link to it with [fig. 01](#fig-01), and the tab links to itself. Chart
// components draw their own figure, so they only receive their number.
export default function figures() {
  return (tree) => {
    let count = 0

    function visit(node) {
      node.children?.forEach((child, index) => {
        const found = image(child) ?? diagram(child)
        if (found) {
          count += 1
          node.children[index] = figure(found, count)
        } else if (chart(child)) {
          count += 1
          child.attributes.push({
            type: 'mdxJsxAttribute',
            name: 'figure',
            value: pad(count),
          })
        } else {
          visit(child)
        }
      })
    }
    visit(tree)
  }
}

// A paragraph holding only an image, captioned by its alt text.
function image(node) {
  if (!isElement(node, 'p') || node.children.length !== 1) return
  const [media] = node.children
  if (media.tagName !== 'img') return
  const alt = media.properties.alt?.trim()
  return { media, caption: alt ? [{ type: 'text', value: alt }] : [] }
}

// A diagram from mermaid.mjs, captioned by its accTitle.
function diagram(node) {
  if (!isElement(node, 'div') || !node.properties.className?.includes('mermaid')) return
  const title = node.children[0].children.find((child) => child.tagName === 'title')
  return { media: node, caption: title?.children ?? [], className: ['diagram'] }
}

// An MDX chart component, such as <BarChart />.
function chart(node) {
  return node.type === 'mdxJsxFlowElement' && Boolean(node.name?.endsWith('Chart'))
}

function pad(count) {
  return String(count).padStart(2, '0')
}

function isElement(node, tagName) {
  return node.type === 'element' && node.tagName === tagName
}

function figure({ media, caption, className }, count) {
  const number = pad(count)
  return {
    type: 'element',
    tagName: 'figure',
    properties: { id: `fig-${number}`, className },
    children: [
      {
        type: 'element',
        tagName: 'a',
        properties: { className: ['tab'], href: `#fig-${number}` },
        children: [{ type: 'text', value: `fig. ${number}` }],
      },
      media,
      ...(caption.length
        ? [{ type: 'element', tagName: 'figcaption', properties: {}, children: caption }]
        : []),
    ],
  }
}
