import { ReactNode } from 'react'

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose flex w-full items-center justify-center rounded-lg border-2 border-gray-400 p-12">
      {children}
    </div>
  )
}
