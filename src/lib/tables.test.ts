import { describe, expect, it } from 'vitest'
import tables from './tables.mjs'

interface Node {
  type: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: Node[]
}

function element(tagName: string, properties = {}, children: Node[] = []): Node {
  return { type: 'element', tagName, properties, children }
}

function run(...children: Node[]) {
  const tree = { type: 'root', children }
  tables()(tree)
  return tree.children
}

function scroll(table: Node) {
  return element('div', { className: ['table-scroll'] }, [table])
}

describe('tables', () => {
  it('wraps a table in a scroll box', () => {
    const table = element('table', {}, [element('tbody')])
    expect(run(table)).toEqual([scroll(table)])
  })

  it('wraps a table nested in a list', () => {
    const table = element('table')
    expect(run(element('ul', {}, [element('li', {}, [table])]))).toEqual([
      element('ul', {}, [element('li', {}, [scroll(table)])]),
    ])
  })
})
