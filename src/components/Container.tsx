import type { ReactNode } from 'react'

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none sm:p-10">
      <div className="flex w-full justify-center">{children}</div>
    </div>
  )
}
