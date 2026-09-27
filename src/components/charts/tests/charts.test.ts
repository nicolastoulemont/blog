import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { BarChart, PieChart } from '..'

function bars(data = [{ route: '/blog', js: 1200, css: 8 }]) {
  return createElement(BarChart<'route', 'js' | 'css'>, {
    title: 'Bundle size by route',
    unit: 'kB',
    figure: '03',
    index: 'route',
    series: { js: 'JavaScript', css: 'CSS' },
    data,
  })
}

describe('charts', () => {
  it('renders a numbered figure captioned by its title', () => {
    const html = renderToString(bars())
    expect(html).toContain('<figure class="chart" id="fig-03"')
    expect(html).toContain('<a class="tab" href="#fig-03">fig. 03</a>')
    expect(html).toContain('<figcaption>Bundle size by route</figcaption>')
  })

  it('renders the values as a table before the plot hydrates', () => {
    const html = renderToString(bars())
    expect(html).toContain('<th scope="col">JavaScript</th>')
    expect(html).toContain('<th scope="row">/blog</th><td>1,200kB</td><td>8kB</td>')
  })

  it('renders pie values as rows', () => {
    const html = renderToString(
      createElement(PieChart, { title: 'Readers', unit: '%', data: { Search: 48 } }),
    )
    expect(html).toContain('<th scope="row">Search</th><td>48%</td>')
  })

  it('fails the render, and so the build, naming the broken chart', () => {
    // MDX props are not type-checked, so a row can miss a series.
    const data = [{ route: '/blog', js: 1200 }] as Parameters<typeof bars>[0]
    expect(() => renderToString(bars(data))).toThrow(
      'BarChart "Bundle size by route": row 1 has no number for "css"',
    )
  })
})
