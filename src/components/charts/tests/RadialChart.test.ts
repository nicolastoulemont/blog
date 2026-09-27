import { describe, expect, it } from 'vitest'
import { layout, sector } from '../RadialChart'
import { view, type Mark, type States } from '../selection.utils'

function marks(...keys: string[]): Mark[] {
  return keys.map((key) => ({ key, label: key, color: key, pattern: key, fill: key }))
}

function bands(states: States, closed?: string) {
  return layout(view(marks('core', 'ui', 'api'), states), closed)
}

describe('layout', () => {
  it('gives open rings equal widths, one gap apart, from the center out', () => {
    const { core, ui, api } = Object.fromEntries(bands(new Map()))
    const width = core.outer - core.inner
    expect(ui.outer - ui.inner).toBeCloseTo(width)
    expect(api.outer - api.inner).toBeCloseTo(width)
    expect(ui.inner - core.outer).toBeCloseTo(api.inner - ui.outer)
  })

  it('closes a leaving ring into the gap between its neighbours', () => {
    const { core, ui, api } = Object.fromEntries(bands(new Map([['ui', 'leaving']])))
    expect(ui.inner).toBe(ui.outer)
    expect(ui.inner).toBeGreaterThan(core.outer)
    expect(ui.inner).toBeLessThan(api.inner)
  })

  it('leaves out hidden rings and widens the rest', () => {
    const open = bands(new Map())
    const fewer = bands(new Map([['ui', 'hidden']]))
    expect(fewer.has('ui')).toBe(false)
    const core = fewer.get('core')!
    expect(core.outer - core.inner).toBeGreaterThan(
      open.get('core')!.outer - open.get('core')!.inner,
    )
  })

  it('places a returning ring where it will open', () => {
    const closed = bands(new Map(), 'api').get('api')!
    expect(closed.inner).toBe(closed.outer)
    expect(closed.inner).toBeCloseTo(bands(new Map()).get('api')!.outer)
  })
})

describe('sector', () => {
  it('draws nothing without width or sweep', () => {
    expect(sector(40, 40, 90)).toBe('')
    expect(sector(30, 40, 0)).toBe('')
  })

  it('draws a full turn as a ring just short of closing', () => {
    expect(sector(30, 40, 360)).toBe(sector(30, 40, 359.99))
  })
})
