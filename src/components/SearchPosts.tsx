import { startTransition, useDeferredValue, useState } from 'react'
import type { SearchIndexItem } from '~/lib/blog'
import { PostCard } from './PostCard'

interface SearchPostsProps {
  posts: SearchIndexItem[]
}

export function SearchPosts({ posts }: SearchPostsProps) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())

  const filteredPosts =
    deferredQuery.length === 0
      ? posts
      : posts.filter((post) => {
          return (
            post.title.toLowerCase().includes(deferredQuery) ||
            post.description.toLowerCase().includes(deferredQuery) ||
            post.localeLabel.toLowerCase().includes(deferredQuery) ||
            post.categories.some((category) => category.toLowerCase().includes(deferredQuery))
          )
        })

  return (
    <section className="space-y-6">
      <div className="surface-card p-5 sm:p-6">
        <label htmlFor="search" className="mb-3 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Search all posts
        </label>
        <input
          id="search"
          name="search"
          type="search"
          autoComplete="off"
          value={query}
          placeholder="Search by title, category, locale, or description"
          className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-base text-slate-950 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-200/70 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-50 dark:focus:border-sky-500 dark:focus:ring-sky-500/20"
          onChange={(event) => {
            const nextValue = event.currentTarget.value
            startTransition(() => setQuery(nextValue))
          }}
        />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="surface-card p-8 text-center text-slate-600 dark:text-slate-300">
          No posts match <span className="font-medium text-slate-950 dark:text-slate-50">{query}</span>.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostCard key={post.url} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}
