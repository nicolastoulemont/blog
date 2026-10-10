import { describe, expect, it } from 'vitest'
import {
  parseRings,
  parseSeries,
  parseValues,
  type RingsProps,
  type SeriesProps,
} from '../contracts.utils'

// Builders valid by default; each test shows only what it breaks. The changes
// are untyped, like MDX props.
function series(changes: object = {}): SeriesProps<'week', 'search'> {
  const valid: SeriesProps<'week', 'search'> = {
    title: 'Readers',
    index: 'week',
    series: { search: 'Search' },
    data: [{ week: 'W1', search: 820 }],
  }
  return { ...valid, ...changes }
}

function values(changes: object = {}): RingsProps {
  return { title: 'Coverage', data: { core: 92, ui: 78 }, ...changes }
}

// `count` entries mapping s0, s1, … to `value`.
function many<V>(count: number, value: V) {
  return Object.fromEntries(Array.from({ length: count }, (_, at) => [`s${at}`, value]))
}

describe('parseSeries', () => {
  it('returns valid props as they are', () => {
    const props = series()
    expect(parseSeries('LineChart', props)).toBe(props)
  })

  it('rejects a missing title', () => {
    expect(() => parseSeries('LineChart', series({ title: ' ' }))).toThrow(
      'LineChart " ": title is required',
    )
  })

  it.each([
    [{ unit: 'km' }, 'unit "km" is not one of %, ms, s, h, B, kB, MB'],
    [{ filterable: 'yes' }, 'filterable is a flag: write filterable or leave it out'],
    [{ series: {} }, 'series needs at least one entry'],
    [{ series: many(7, 'Series') }, 'series has 7 entries; charts have 6 colors'],
    [{ data: [] }, 'data needs at least one row'],
    [{ data: [{ search: 820 }] }, 'row 1 has no "week"'],
    [{ data: [{ week: 'W1', search: '820' }] }, 'row 1 has no number for "search"'],
  ])('rejects %j', (changes, reason) => {
    expect(() => parseSeries('LineChart', series(changes))).toThrow(
      `LineChart "Readers": ${reason}`,
    )
  })
})

describe('parseValues', () => {
  it.each([
    [{ data: {} }, 'data needs at least one value'],
    [{ data: many(7, 1) }, 'data has 7 values; charts have 6 colors'],
    [{ data: { core: -1 } }, '"core" needs a number of 0 or more'],
    [{ unit: 'km' }, 'unit "km" is not one of %, ms, s, h, B, kB, MB'],
  ])('rejects %j', (changes, reason) => {
    expect(() => parseValues('PieChart', values(changes))).toThrow(
      `PieChart "Coverage": ${reason}`,
    )
  })
})

describe('parseRings', () => {
  it('defaults max to the largest value', () => {
    expect(parseRings('RadialChart', values()).max).toBe(92)
  })

  it.each([
    [{ max: 0 }, 'max needs a number above 0'],
    [{ max: 80 }, '"core" is above max 80'],
  ])('rejects %j', (changes, reason) => {
    expect(() => parseRings('RadialChart', values(changes))).toThrow(
      `RadialChart "Coverage": ${reason}`,
    )
  })
})
