import { describe, expect, it } from 'vitest'
import figures from './figures.mjs'

interface Node {
  type: string
  tagName?: string
  value?: string
  properties?: Record<string, unknown>
  children?: Node[]
}

function text(value: string): Node {
  return { type: 'text', value }
}

function element(tagName: string, properties = {}, children: Node[] = []): Node {
  return { type: 'element', tagName, properties, children }
}

function image(alt = 'A cat') {
  return element('img', { src: '/cat.png', alt })
}

function diagram(title = 'Request flow') {
  return element('div', { className: ['mermaid'] }, [
    element('svg', {}, [element('title', {}, [text(title)])]),
  ])
}

function run(...children: Node[]) {
  const tree = { type: 'root', children }
  figures()(tree)
  return tree.children
}

function figure(number: string, media: Node, caption: Node[], className?: string[]) {
  return element('figure', { id: `fig-${number}`, className }, [
    element('a', { className: ['tab'], href: `#fig-${number}` }, [
      text(`fig. ${number}`),
    ]),
    media,
    ...(caption.length ? [element('figcaption', {}, caption)] : []),
  ])
}

describe('figures', () => {
  it('captions a lone image with its alt text', () => {
    expect(run(element('p', {}, [image(' A cat ')]))).toEqual([
      figure('01', image(' A cat '), [text('A cat')]),
    ])
  })

  it('leaves out the caption when the image has no alt text', () => {
    expect(run(element('p', {}, [image('')]))).toEqual([figure('01', image(''), [])])
  })

  it('captions a Mermaid diagram with its title', () => {
    const [title] = diagram().children![0].children!
    expect(run(diagram())).toEqual([
      figure('01', diagram(), title.children!, ['diagram']),
    ])
  })

  it('numbers figures in document order, including nested ones', () => {
    const [first, section] = run(
      element('p', {}, [image()]),
      element('section', {}, [diagram()]),
    )
    expect(first.properties?.id).toBe('fig-01')
    expect(section.children?.[0].properties?.id).toBe('fig-02')
  })

  it('leaves an image that shares its paragraph with text', () => {
    const paragraph = () => element('p', {}, [text('See '), image()])
    expect(run(paragraph())).toEqual([paragraph()])
  })
})
