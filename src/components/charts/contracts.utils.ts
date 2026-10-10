import * as z from 'zod/mini'

// Chart props and the rules they must follow. MDX does not type-check props, so
// each chart parses its props during the server render: a bad chart throws and
// fails the build, naming the chart and its first problem. The browser hydrates
// with the props the server already checked, so it skips the check, and Zod
// stays out of the client bundle.

const UNITS = ['%', 'ms', 's', 'h', 'B', 'kB', 'MB'] as const
export type Unit = (typeof UNITS)[number]

// The palette has this many colors. A chart needing more should fold the extra
// series into "Other".
const COLORS = 6

// `figure` comes from the figures rehype plugin, which numbers charts alongside
// images and diagrams.
export interface ChartProps {
  title: string
  unit?: Unit
  figure?: string
  // Let readers hide series or values from a menu.
  filterable?: boolean
}

// Rows keyed by `index` (the category or date on the axis), with one number per series.
export interface SeriesProps<I extends string, S extends string> extends ChartProps {
  data: ReadonlyArray<Record<I, string | number> & Record<S, number>>
  index: I
  // Series key to its label, in color order.
  series: Record<S, string>
}

// One number per label, in color order.
export interface ValuesProps extends ChartProps {
  data: Record<string, number>
}

// Values drawn as rings against a shared maximum.
export interface RingsProps extends ValuesProps {
  // The value of a full ring. Defaults to the largest value.
  max?: number
}

// The schemas, built on first use. Only the server calls this (see parse), so
// the client build drops it and every Zod call in it.
let built: ReturnType<typeof build> | undefined
function schemas() {
  return (built ??= build())
}

function build() {
  // The props every chart shares. Objects stay loose: charts add their own
  // props, such as `stacked`, and Astro adds `client:*` directives.
  const chart = {
    title: z
      .string({ error: 'title is required' })
      .check(z.refine((title) => title.trim() !== '', 'title is required')),
    unit: z.optional(
      z.enum(UNITS, {
        error: (issue) =>
          `unit "${String(issue.input)}" is not one of ${UNITS.join(', ')}`,
      }),
    ),
    filterable: z.optional(
      z.boolean({ error: 'filterable is a flag: write filterable or leave it out' }),
    ),
  }

  // A record of one entry per color, named in messages as `noun`, `one` and `many`.
  function palette<V extends z.ZodMiniType>(
    value: V,
    { noun, one, many }: { noun: string; one: string; many: string },
  ) {
    const empty = `${noun} needs at least one ${one}`
    return z.record(z.string(), value, { error: empty }).check(
      z.superRefine((record, context) => {
        const size = Object.keys(record).length
        if (size === 0) context.addIssue({ code: 'custom', message: empty })
        if (size > COLORS) {
          const message = `${noun} has ${size} ${many}; charts have ${COLORS} colors`
          context.addIssue({ code: 'custom', message })
        }
      }),
    )
  }

  // A value must be a number of 0 or more. Its label is the last step of the
  // issue's path: data.<label>.
  function badAmount(issue: { path?: PropertyKey[] }) {
    return `"${String(issue.path?.at(-1))}" needs a number of 0 or more`
  }

  const amount = z.number({ error: badAmount }).check(z.minimum(0, { error: badAmount }))

  const Series = z
    .looseObject({
      ...chart,
      series: palette(z.unknown(), { noun: 'series', one: 'entry', many: 'entries' }),
      data: z
        .array(
          z.record(z.string(), z.unknown(), { error: 'each row needs to be an object' }),
          {
            error: 'data needs at least one row',
          },
        )
        .check(z.minLength(1, 'data needs at least one row')),
      index: z.optional(z.unknown()),
    })
    .check(
      z.superRefine(({ data, index, series }, context) => {
        const axis = String(index)
        data.forEach((row, at) => {
          if (typeof row[axis] !== 'string' && typeof row[axis] !== 'number') {
            context.addIssue({
              code: 'custom',
              message: `row ${at + 1} has no "${axis}"`,
            })
          }
          for (const key of Object.keys(series)) {
            if (!Number.isFinite(row[key])) {
              const message = `row ${at + 1} has no number for "${key}"`
              context.addIssue({ code: 'custom', message })
            }
          }
        })
      }),
    )

  const Values = z.looseObject({
    ...chart,
    data: palette(amount, { noun: 'data', one: 'value', many: 'values' }),
    max: z.optional(z.unknown()),
  })

  // The largest value is the default max, so a chart of zeros has none above 0.
  const Rings = Values.check(
    z.superRefine(({ data, max }, context) => {
      const top = max ?? Math.max(...Object.values(data))
      if (typeof top !== 'number' || !Number.isFinite(top) || top <= 0) {
        context.addIssue({ code: 'custom', message: 'max needs a number above 0' })
        return
      }
      for (const [label, value] of Object.entries(data)) {
        if (value > top) {
          context.addIssue({ code: 'custom', message: `"${label}" is above max ${top}` })
        }
      }
    }),
  )

  return { Series, Values, Rings }
}

// Parse `props` against `schema` on the server, throwing its first problem with
// the chart's name. Vite sets import.meta.env.SSR to false in the client build,
// so the check and the schemas it reads are dropped from it.
function parse<P extends ChartProps>(
  props: P,
  { schema, chart }: { schema: keyof ReturnType<typeof build>; chart: string },
): P {
  if (!import.meta.env.SSR) return props
  const result = schemas()[schema].safeParse(props)
  if (!result.success) {
    throw new Error(`${chart} "${props.title}": ${result.error.issues[0].message}`)
  }
  return props
}

// P keeps a chart's own props, such as `stacked`, on the parsed result.
export function parseSeries<I extends string, S extends string, P>(
  chart: string,
  props: P & SeriesProps<I, S>,
): P & SeriesProps<I, S> {
  return parse(props, { schema: 'Series', chart })
}

export function parseValues<P extends ValuesProps>(chart: string, props: P): P {
  return parse(props, { schema: 'Values', chart })
}

export function parseRings<P extends RingsProps>(chart: string, props: P) {
  const { data, max = Math.max(...Object.values(data)) } = parse(props, {
    schema: 'Rings',
    chart,
  })
  return { ...props, max }
}
