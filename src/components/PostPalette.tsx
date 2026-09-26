import { lazy, startTransition, useRef, useState } from 'react'
import { useHotkey } from '~/hooks/useHotkey'
import { useHydrated } from '~/hooks/useHydrated'
import type { BlogPostSummary } from '~/lib/post'
import { UI_STRINGS, type SiteLocale } from '~/lib/site'
import { ErrorBoundary } from './ErrorBoundary'

export interface SearchProps {
  posts: Pick<BlogPostSummary, 'url' | 'title' | 'description' | 'categories'>[]
  locale: SiteLocale
}

// Loaded the first time a reader opens search.
const PostDialog = lazy(() =>
  import('./PostDialog').then(({ PostDialog }) => ({ default: PostDialog })),
)

// Idle until the reader first opens search. The dialog then stays mounted so
// closing it returns focus to the button.
type Search = 'idle' | 'open' | 'closed'

export function PostPalette({ posts, locale }: SearchProps) {
  const [search, setSearch] = useState<Search>('idle')
  const open = search === 'open'
  const hydrated = useHydrated()
  const trigger = useRef<HTMLButtonElement>(null)
  const ui = UI_STRINGS[locale]

  function toggle() {
    // Without a Suspense boundary, the transition keeps the page as it is
    // until the dialog's code has loaded.
    startTransition(() =>
      setSearch((current) => (current === 'open' ? 'closed' : 'open')),
    )
  }

  useHotkey('Mod+K', toggle)

  return (
    <>
      <button
        ref={trigger}
        type="button"
        disabled={!hydrated}
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
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
      {search !== 'idle' && (
        <ErrorBoundary
          fallback={
            open && (
              <p role="alert" className="mt-2 text-xs">
                {ui.searchFailed}{' '}
                <a href="/" className="underline">
                  {ui.browsePosts}
                </a>
              </p>
            )
          }
        >
          <PostDialog
            posts={posts}
            locale={locale}
            open={open}
            onOpenChange={(next) => setSearch(next ? 'open' : 'closed')}
            trigger={trigger}
          />
        </ErrorBoundary>
      )}
    </>
  )
}
