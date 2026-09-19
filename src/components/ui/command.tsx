import type { ComponentProps } from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import clsx from 'clsx'

// Adapted from https://ui.shadcn.com/docs/components/base/command.
export function Command({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={clsx(
        'bg-panel text-fg flex min-h-0 w-full flex-col overflow-hidden',
        className,
      )}
      {...props}
    />
  )
}

export function CommandInput({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <CommandPrimitive.Input
      className={clsx(
        'border-line bg-panel-2 placeholder:text-muted h-12 w-full shrink-0 border-b px-4 text-sm outline-none',
        className,
      )}
      {...props}
    />
  )
}

export function CommandList({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={clsx(
        'max-h-[min(24rem,50dvh)] overflow-x-hidden overflow-y-auto overscroll-contain p-2',
        className,
      )}
      {...props}
    />
  )
}

export function CommandEmpty({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      className={clsx('text-muted px-4 py-8 text-center text-sm', className)}
      {...props}
    />
  )
}

export function CommandItem({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={clsx(
        'data-[selected=true]:border-accent data-[selected=true]:bg-accent-soft cursor-pointer border border-transparent px-3 py-3 text-sm outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
