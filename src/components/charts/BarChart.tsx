import * as Recharts from 'recharts'
import { Axes, Dithers } from './Chart'
import { Figure, useSeries } from './Figure'
import { animation, drawnRows } from './animation.utils'
import { parseSeries, type SeriesProps } from './contracts.utils'

interface BarChartProps<I extends string, S extends string> extends SeriesProps<I, S> {
  // Stack the series when they add up to a whole.
  stacked?: boolean
}

export function BarChart<I extends string, S extends string>(props: BarChartProps<I, S>) {
  const chart = parseSeries('BarChart', props)
  const { data, index, unit, stacked } = chart
  const { selection, frame } = useSeries(chart)
  return (
    <Figure {...frame} shape="wide">
      <Recharts.BarChart
        data={drawnRows(data, selection)}
        responsive
        style={{ height: '100%' }}
        barGap={4}
      >
        <Dithers marks={selection.marks} />
        <Axes index={index} unit={unit} marks={selection.shown} cursor="band" />
        {selection.marks.map(({ key, label, color, fill }) => (
          <Recharts.Bar
            key={key}
            {...animation}
            // Grouped bars drop a hidden series so the others take its slot;
            // a stack keeps it at zero (see drawnRows).
            hide={!stacked && selection.hidden(key)}
            dataKey={key}
            name={label}
            stackId={stacked ? 'stack' : undefined}
            fill={fill}
            stroke={selection.hidden(key) ? 'none' : color}
            strokeWidth={2}
            maxBarSize={32}
            // Recharts drops zero-height bars unless the shape is custom, which
            // would cut a leaving bar before it shrinks to the axis.
            shape={<Recharts.Rectangle />}
          />
        ))}
      </Recharts.BarChart>
    </Figure>
  )
}
