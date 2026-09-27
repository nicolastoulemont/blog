import type { Point } from './animation.utils'
import type { SeriesProps, Unit } from './contracts.utils'
import type { Mark } from './selection.utils'

// How charts write their numbers, in axes, tooltips and the screen-reader table.

const numbers = new Intl.NumberFormat('en')

export function format(value: number, unit: Unit | undefined) {
  return `${numbers.format(value)}${unit ?? ''}`
}

// The numbers behind a chart, for the table screen readers get.
export interface Table {
  head: string[]
  rows: string[][]
}

export function seriesTable<I extends string, S extends string>(
  { data, index, unit }: SeriesProps<I, S>,
  marks: Mark[],
): Table {
  return {
    head: [index, ...marks.map(({ label }) => label)],
    rows: data.map((row) => [
      String(row[index]),
      ...marks.map(({ key }) => format(row[key as S], unit)),
    ]),
  }
}

export function valuesTable(values: Point[], unit?: Unit): Table {
  return {
    head: ['Name', 'Value'],
    rows: values.map(({ name, value }) => [name, format(value, unit)]),
  }
}
