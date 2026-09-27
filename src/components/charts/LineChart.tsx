import * as Recharts from 'recharts'
import { Axes, Square } from './Chart'
import { Figure, useSeries } from './Figure'
import { animation } from './animation.utils'
import { parseSeries, type SeriesProps } from './contracts.utils'
import { type View } from './selection.utils'

export function LineChart<I extends string, S extends string>(props: SeriesProps<I, S>) {
  const chart = parseSeries('LineChart', props)
  const { data, index, unit } = chart
  const { selection, frame } = useSeries(chart)
  return (
    <Figure {...frame} shape="wide">
      <Recharts.LineChart
        data={lineRows(data, selection)}
        responsive
        style={{ height: '100%' }}
      >
        <Axes index={index} unit={unit} marks={selection.shown} cursor="rule" />
        {selection.marks.map(({ key, label, color }) => (
          <Recharts.Line
            key={key}
            {...animation}
            // A hidden line fades out in place, and fades back in when shown.
            className={selection.shows(key) ? undefined : 'faded'}
            dataKey={key}
            name={label}
            type="linear"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={selection.shows(key) ? Square : false}
          />
        ))}
      </Recharts.LineChart>
    </Figure>
  )
}

// The rows a line chart draws. Hidden lines stay mounted, so they can fade
// back in without Recharts drawing them in from the left. Scaled down by as
// much as the axis shrank, a hidden line keeps its pixels and cannot stretch
// the axis; when it returns, it fades in where it lands while the axis grows back.
export function lineRows<I extends string, S extends string>(
  data: SeriesProps<I, S>['data'],
  selection: View,
) {
  const keys = selection.marks.map(({ key }) => key as S)
  const peak = (key: S) => Math.max(...data.map((row) => row[key]))
  const top = Math.max(...keys.filter((key) => !selection.hidden(key)).map(peak))
  return data.map((row) => ({
    ...row,
    ...Object.fromEntries(
      keys
        .filter((key) => selection.hidden(key))
        .map((key) => [key, (row[key] * top) / Math.max(top, peak(key))]),
    ),
  }))
}
