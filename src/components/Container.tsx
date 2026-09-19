import type { ReactNode } from 'react'

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose demo-frame border-line-strong bg-panel flex w-full items-center justify-center border py-8 sm:px-6">
      {children}
    </div>
  )
}
