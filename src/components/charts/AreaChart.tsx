import * as Recharts from 'recharts'
import { Axes, Dithers, Square } from './Chart'
import { Figure, useSeries } from './Figure'
import { animation, drawnRows } from './animation.utils'
import { parseSeries, type SeriesProps } from './contracts.utils'

interface AreaChartProps<I extends string, S extends string> extends SeriesProps<I, S> {
  // Stack the series when they add up to a whole.
  stacked?: boolean
}

export function AreaChart<I extends string, S extends string>(
  props: AreaChartProps<I, S>,
) {
  const chart = parseSeries('AreaChart', props)
  const { data, index, unit, stacked } = chart
  const { selection, frame } = useSeries(chart)
  return (
    <Figure {...frame} shape="wide">
      <Recharts.AreaChart
        data={drawnRows(data, selection)}
        responsive
        style={{ height: '100%' }}
      >
        <Dithers marks={selection.marks} />
        <Axes index={index} unit={unit} marks={selection.shown} cursor="rule" />
        {selection.marks.map(({ key, label, color, fill }) => (
          <Recharts.Area
            key={key}
            {...animation}
            dataKey={key}
            name={label}
            type="linear"
            stackId={stacked ? 'stack' : undefined}
            stroke={selection.hidden(key) ? 'none' : color}
            strokeWidth={2}
            fill={fill}
            fillOpacity={1}
            activeDot={selection.shows(key) ? Square : false}
          />
        ))}
      </Recharts.AreaChart>
    </Figure>
  )
}
