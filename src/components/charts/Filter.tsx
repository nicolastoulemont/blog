import { Menu } from '@base-ui/react/menu'
import { useEffect, useState, type CSSProperties } from 'react'
import { DURATION } from './animation.utils'
import {
  select,
  settle,
  view,
  type Mark,
  type States,
  type View,
} from './selection.utils'

// The marks a reader chose to show, and the action to change them.
export interface Selection extends View {
  show: (key: string, visible: boolean) => void
}

export function useSelection(marks: Mark[]): Selection {
  const [states, setStates] = useState<States>(() => new Map())
  const leaving = [...states.values()].includes('leaving')

  useEffect(() => {
    if (!leaving) return
    // Hiding another mark mid-exit restarts the clock, so both leave together.
    const timer = setTimeout(() => setStates(settle), DURATION)
    return () => clearTimeout(timer)
  }, [leaving, states])

  return {
    ...view(marks, states),
    show: (key, visible) =>
      setStates((current) => select(current, key, { visible, still: still() })),
  }
}

function still() {
  return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

// A chip that opens a checklist of the chart's marks. The last shown mark
// cannot be hidden, so the chart never goes empty.
export function Filter({ title, selection }: { title: string; selection: Selection }) {
  const { marks, shown, shows, show } = selection
  return (
    <Menu.Root>
      <Menu.Trigger className="chip chart-filter" aria-label={`Filter ${title}`}>
        Filter
        <span className="text-faint" aria-hidden="true">
          {shown.length}/{marks.length}
        </span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="z-30" align="end" sideOffset={4}>
          <Menu.Popup className="chart-menu">
            {marks.map(({ key, label, color }) => (
              <Menu.CheckboxItem
                key={key}
                className="chart-menu-item"
                style={{ '--cat': color } as CSSProperties}
                checked={shows(key)}
                disabled={shows(key) && shown.length === 1}
                onCheckedChange={(checked) => show(key, checked)}
              >
                <span className="chart-check" aria-hidden="true" />
                {label}
              </Menu.CheckboxItem>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
