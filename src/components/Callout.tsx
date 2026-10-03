import type { CSSProperties, ReactNode } from 'react'

const VARIANTS = {
  note: { label: 'Note', color: 'var(--accent)' },
  definition: { label: 'Definition', color: 'var(--fg-muted)' },
  tip: { label: 'Tip', color: 'var(--cat-general)' },
  warning: { label: 'Warning', color: 'var(--cat-animations)' },
} as const
interface CalloutProps {
  children: ReactNode
  variant?: keyof typeof VARIANTS
  // Overrides the variant's label, such as in a French post.
  label?: string
}
export function Callout({
  children,
  variant = 'note',
  label = VARIANTS[variant].label,
}: CalloutProps) {
  return (
    <aside
      className="callout"
      style={{ '--callout': VARIANTS[variant].color } as CSSProperties}
    >
      <span className="tab">{label}</span>
      {children}
    </aside>
  )
}
