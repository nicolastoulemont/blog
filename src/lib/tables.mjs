// Wraps each table in a box that scrolls sideways, so a table wider than the
// column scrolls inside its frame instead of breaking words or the page.
export default function tables() {
  return (tree) => {
    function visit(node) {
      node.children?.forEach((child, index) => {
        if (child.type === 'element' && child.tagName === 'table') {
          node.children[index] = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-scroll'] },
            children: [child],
          }
        } else {
          visit(child)
        }
      })
    }
    visit(tree)
  }
}
