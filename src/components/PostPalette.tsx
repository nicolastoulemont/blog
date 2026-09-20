import { useCallback, useEffect, useRef, useState } from 'react'
import type { BlogPostSummary } from '~/lib/post'
import { UI_STRINGS, type SiteLocale } from '~/lib/site'

export interface SearchProps {
  posts: Pick<BlogPostSummary, 'url' | 'title' | 'description' | 'categories'>[]
  locale: SiteLocale
}

type Search =
  | { status: 'idle' | 'loading' | 'failed' }
  | { status: 'ready'; Dialog: typeof import('./PostDialog').PostDialog }

export function PostPalette({ posts, locale }: SearchProps) {
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [search, setSearch] = useState<Search>({ status: 'idle' })
  const trigger = useRef<HTMLButtonElement>(null)
  const ui = UI_STRINGS[locale]

  const toggle = useCallback(() => {
    setOpen((value) => !value)
    if (search.status === 'idle') {
      setSearch({ status: 'loading' })
      void import('./PostDialog').then(
        ({ PostDialog }) => setSearch({ status: 'ready', Dialog: PostDialog }),
        () => setSearch({ status: 'failed' }),
      )
    }
  }, [search.status])

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- Keep the server-rendered trigger disabled until hydration.
    setReady(true)
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.key.toLowerCase() !== 'k' ||
        !(event.metaKey || event.ctrlKey) ||
        event.altKey ||
        event.isComposing ||
        event.repeat
      )
        return
      event.preventDefault()
      toggle()
    }
    function onSwap() {
      setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('astro:before-swap', onSwap)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('astro:before-swap', onSwap)
    }
  }, [toggle])

  return (
    <>
      <button
        ref={trigger}
        type="button"
        disabled={!ready}
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-busy={search.status === 'loading'}
        aria-keyshortcuts="Meta+K Control+K"
        className="border-line-strong bg-panel text-muted hover:text-fg inline-flex w-full cursor-pointer items-center justify-between gap-3 border px-3 py-2 text-xs disabled:opacity-50 min-[56.01rem]:w-auto"
      >
        {ui.searchPosts}
        <kbd
          aria-hidden="true"
          className="border-line border px-1 font-mono text-[0.65rem]"
        >
          ⌘ K
        </kbd>
      </button>
      {open && search.status === 'loading' && (
        <p role="status" className="text-muted mt-2 text-xs">
          {ui.searchLoading}
        </p>
      )}
      {open && search.status === 'failed' && (
        <p role="alert" className="mt-2 text-xs">
          {ui.searchFailed}{' '}
          <a href="/" className="underline">
            {ui.browsePosts}
          </a>
        </p>
      )}
      {search.status === 'ready' && (
        <search.Dialog
          posts={posts}
          locale={locale}
          open={open}
          onOpenChange={setOpen}
          trigger={trigger}
        />
      )}
    </>
  )
}
