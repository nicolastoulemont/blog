import { useRef, type RefObject } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { defaultFilter } from 'cmdk'
import { navigate } from 'astro:transitions/client'
import { Tag } from './Tag'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import type { SearchProps } from './PostPalette'
import { UI_STRINGS } from '~/lib/site'

interface Props extends SearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger: RefObject<HTMLButtonElement | null>
}

export function PostDialog({ posts, locale, open, onOpenChange, trigger }: Props) {
  const input = useRef<HTMLInputElement>(null)
  const ui = UI_STRINGS[locale]
  function select(url: string) {
    onOpenChange(false)
    void navigate(url)
  }
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Popup
          initialFocus={input}
          finalFocus={trigger}
          className="border-line-strong bg-panel text-fg fixed top-[10dvh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden border shadow-xl outline-none"
        >
          <div className="border-line flex items-center justify-between gap-4 border-b px-4 py-3">
            <Dialog.Title className="text-xs font-semibold uppercase">
              {ui.searchPosts}
            </Dialog.Title>
            <Dialog.Close
              aria-label={ui.closeSearch}
              className="border-line text-muted hover:text-fg cursor-pointer border px-2 py-1 text-xs"
            >
              Esc
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">{ui.searchHelp}</Dialog.Description>
          <Command
            label={ui.searchPosts}
            loop
            filter={(_url, search, keywords = []) =>
              Math.max(
                0,
                ...keywords.map(
                  (keyword, index) =>
                    defaultFilter(keyword, search) * (index === 0 ? 1 : 0.5),
                ),
              )
            }
          >
            <CommandInput
              ref={input}
              placeholder={ui.searchPlaceholder}
              aria-label={ui.searchPosts}
            />
            <CommandList label={ui.posts}>
              <CommandEmpty>{ui.noPosts}</CommandEmpty>
              {posts.map((post) => (
                <CommandItem
                  key={post.url}
                  value={post.url}
                  keywords={[post.title, post.description, ...post.categories]}
                  onSelect={() => select(post.url)}
                >
                  <span className="block font-semibold">{post.title}</span>
                  <span className="text-muted mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                    {post.categories.map((category) => (
                      <Tag key={category} category={category} />
                    ))}
                  </span>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
          <p className="border-line text-muted border-t px-4 py-2 text-[0.65rem]">
            {ui.searchHelp}
          </p>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
