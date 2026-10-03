// @vitest-environment jsdom
import { createMarkdownProcessor } from '@astrojs/markdown-remark'
import { describe, expect, it } from 'vitest'
import code from './code.mjs'

async function render(markdown: string) {
  const processor = await createMarkdownProcessor({
    shikiConfig: { theme: 'dark-plus', wrap: true, transformers: code },
  })
  const { code: html } = await processor.render(markdown)
  return new DOMParser().parseFromString(html, 'text/html').querySelector('pre')!
}

function lines(pre: HTMLElement, selector: string) {
  return [...pre.querySelectorAll(selector)].map((line) => line.textContent)
}

describe('code', () => {
  it('names the file from the title meta', async () => {
    const pre = await render('```tsx title="Accordion.Root.tsx"\nexport {}\n```')
    expect(pre.dataset.title).toBe('Accordion.Root.tsx')
    expect(pre.dataset.language).toBe('tsx')
  })

  it('keeps the language tab without a title', async () => {
    const pre = await render('```ts\nexport {}\n```')
    expect(pre.dataset.title).toBeUndefined()
  })

  it('marks added, removed and highlighted lines and drops the comments', async () => {
    const pre = await render(
      [
        '```ts',
        'const a = 1 // [!code --]',
        'const a = 2 // [!code ++]',
        'const b = a // [!code highlight]',
        '```',
      ].join('\n'),
    )
    expect(lines(pre, '.line.remove')).toEqual(['const a = 1'])
    expect(lines(pre, '.line.add')).toEqual(['const a = 2'])
    expect(lines(pre, '.line.highlighted')).toEqual(['const b = a'])
    expect(pre.classList).toContain('has-diff')
    expect(pre.classList).toContain('has-highlighted')
  })
})
