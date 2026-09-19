import type { CSSProperties, ReactNode } from 'react'

const COLORS = {
  blue: 'var(--accent)',
  gray: 'var(--fg-muted)',
  orange: 'var(--cat-animations)',
} as const
interface CalloutProps {
  children: ReactNode
  label?: string
  variant?: keyof typeof COLORS
}
export function Callout({ children, label = 'Note', variant = 'blue' }: CalloutProps) {
  return (
    <aside className="callout" style={{ '--callout': COLORS[variant] } as CSSProperties}>
      <span className="tab">{label}</span>
      {children}
    </aside>
  )
}
