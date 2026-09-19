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
    <section>
      <div className="py-6">
        <label htmlFor="search">
          <h2 className="mb-6 text-xl font-bold text-slate-800 dark:text-white sm:text-3xl">
            Posts
          </h2>
        </label>
        <input
          id="search"
          name="search"
          type="search"
          autoComplete="off"
          value={query}
          placeholder="Search posts"
          className="w-full rounded-lg bg-white text-slate-800 placeholder:text-slate-800 outline-none dark:border-black dark:bg-slate-900 dark:text-white dark:placeholder:text-white"
          onChange={(event) => {
            const nextValue = event.currentTarget.value
            startTransition(() => setQuery(nextValue))
          }}
        />
      </div>

      <div aria-hidden className="mb-6 h-0.5 w-full rounded bg-slate-200 dark:bg-slate-900" />

      {filteredPosts.length === 0 ? (
        <div className="py-8 text-center text-slate-600 dark:text-slate-300">
          No posts match <span className="font-medium text-slate-950 dark:text-slate-50">{query}</span>.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.url} post={post} showLocale={false} />
          ))}
        </div>
      )}
    </section>
  )
}
