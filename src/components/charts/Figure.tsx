import type { CSSProperties, ReactNode } from 'react'
import { useMarks } from './Chart'
import { Filter, useSelection, type Selection } from './Filter'
import { DURATION, points } from './animation.utils'
import { type ChartProps, type SeriesProps, type ValuesProps } from './contracts.utils'
import { seriesTable, valuesTable, type Table } from './format.utils'

// A series chart's selection, and the props its figure frame takes.
export function useSeries<I extends string, S extends string>(chart: SeriesProps<I, S>) {
  const selection = useSelection(useMarks(chart.series))
  return {
    selection,
    frame: frame(chart, selection, seriesTable(chart, selection.shown)),
  }
}

// A pie or radial chart's selection, one mark per value, and the props its
// figure frame takes.
export function useValues(chart: ValuesProps) {
  const names = Object.keys(chart.data)
  const selection = useSelection(
    useMarks(Object.fromEntries(names.map((name) => [name, name]))),
  )
  const table = valuesTable(points(selection.shown, chart.data), chart.unit)
  return { selection, frame: frame(chart, selection, table) }
}

function frame(
  { title, figure, filterable }: ChartProps,
  selection: Selection,
  table: Table,
) {
  return { title, figure, filterable, selection, table }
}

interface FigureProps extends ChartProps {
  selection: Selection
  table: Table
  // Cartesian charts run wide; pie, radar and radial charts need a square.
  shape: 'wide' | 'square'
  children: ReactNode
}

// The blog's figure frame: a numbered tab, then a legend when more than one mark
// shows and the filter when the chart is filterable, the plot, and the title as
// caption. The table carries the shown numbers for screen readers, and for the
// server render before the plot hydrates.
export function Figure({
  title,
  figure,
  filterable,
  selection,
  table,
  shape,
  children,
}: FigureProps) {
  const id = figure && `fig-${figure}`
  const legend = selection.shown.length > 1
  const filter = filterable && selection.marks.length > 1
  return (
    <figure
      className="chart"
      id={id}
      style={{ '--chart-duration': `${DURATION}ms` } as CSSProperties}
    >
      {id && (
        <a className="tab" href={`#${id}`}>
          {`fig. ${figure}`}
        </a>
      )}
      {(legend || filter) && (
        <div className="chart-head not-prose">
          {legend && (
            <ul className="chart-legend" aria-hidden="true">
              {selection.shown.map(({ key, label, color }) => (
                <li key={key} className="tag" style={{ '--cat': color } as CSSProperties}>
                  {label}
                </li>
              ))}
            </ul>
          )}
          {filter && <Filter title={title} selection={selection} />}
        </div>
      )}
      <div className={`chart-plot ${shape}`}>{children}</div>
      <figcaption>{title}</figcaption>
      <table className="sr-only">
        <thead>
          <tr>
            {table.head.map((cell, column) => (
              <th key={column} scope="col">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map(([head, ...cells], row) => (
            <tr key={row}>
              <th scope="row">{head}</th>
              {cells.map((cell, column) => (
                <td key={column}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
