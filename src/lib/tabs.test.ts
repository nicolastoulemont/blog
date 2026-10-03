import { describe, expect, it } from 'vitest'
import tabs from './tabs.mjs'

interface Node {
  type: string
  name?: string
  tagName?: string
  value?: string
  properties?: Record<string, unknown>
  children?: Node[]
}

function pre(properties: Record<string, unknown>): Node {
  return { type: 'element', tagName: 'pre', properties, children: [] }
}

function group(...children: Node[]): Node {
  return { type: 'mdxJsxFlowElement', name: 'Tabs', children }
}

function run(...children: Node[]) {
  const tree = { type: 'root', children }
  tabs()(tree)
  return tree.children
}

function tabsOf(node: Node) {
  return node.children![0]!.children!.map(({ properties, children }) => ({
    label: children![0]!.value,
    selected: properties!.ariaSelected,
    controls: properties!.ariaControls,
  }))
}

describe('tabs', () => {
  it('labels each tab with the block title, or its language', () => {
    const [node] = run(
      group(
        pre({ dataLanguage: 'bash', dataTitle: 'pnpm' }),
        { type: 'text', value: '\n' },
        pre({ dataLanguage: 'bash' }),
      ),
    )
    expect(tabsOf(node!)).toEqual([
      { label: 'pnpm', selected: 'true', controls: 'tabs-1-panel-1' },
      { label: 'bash', selected: 'false', controls: 'tabs-1-panel-2' },
    ])
    expect(node!.children!.slice(1).map(({ properties }) => properties)).toEqual([
      expect.objectContaining({ id: 'tabs-1-panel-1', dataSelected: '' }),
      expect.objectContaining({ id: 'tabs-1-panel-2', dataSelected: undefined }),
    ])
  })

  it('gives each group on a page its own ids', () => {
    const [, second] = run(
      group(pre({ dataLanguage: 'ts' })),
      group(pre({ dataLanguage: 'ts' })),
    )
    expect(tabsOf(second!)[0]!.controls).toBe('tabs-2-panel-1')
  })

  it('rejects anything but code blocks', () => {
    expect(() =>
      run(group({ type: 'element', tagName: 'p', properties: {}, children: [] })),
    ).toThrow('<Tabs> only takes fenced code blocks')
  })
})
