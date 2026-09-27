// The marks a chart draws, and which of them a reader chose to show.

// A series or value as drawn: its color, and the dithered pattern <Dithers />
// defines for it.
export interface Mark {
  key: string
  label: string
  color: string
  pattern: string
  fill: string
}

// A mark a reader hid: leaving while its chart animates it out, then hidden.
// A mark with no state shows.
type State = 'leaving' | 'hidden'
export type States = ReadonlyMap<string, State>

// What a chart reads from the marks' states. Hiding a mark never changes
// another's color, because colors come from the full list of marks.
export interface View {
  marks: Mark[]
  // What the legend, table and menu list.
  shown: Mark[]
  shows: (key: string) => boolean
  leaving: (key: string) => boolean
  hidden: (key: string) => boolean
}

export function view(marks: Mark[], states: States): View {
  return {
    marks,
    shown: marks.filter(({ key }) => !states.has(key)),
    shows: (key) => !states.has(key),
    leaving: (key) => states.get(key) === 'leaving',
    hidden: (key) => states.get(key) === 'hidden',
  }
}

// A reader showing or hiding a mark. A hidden mark leaves first, unless motion
// is reduced: the charts skip their animations then, so skip the exit too.
export function select(
  states: States,
  key: string,
  { visible, still }: { visible: boolean; still: boolean },
): States {
  const next = new Map(states)
  if (visible) next.delete(key)
  else next.set(key, still ? 'hidden' : 'leaving')
  return next
}

// The marks that finished leaving become hidden.
export function settle(states: States): States {
  return new Map(
    [...states].map(([key, state]) => [key, state === 'leaving' ? 'hidden' : state]),
  )
}
