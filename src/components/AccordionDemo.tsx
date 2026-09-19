import * as Accordion from './react/Accordion'

const SUGGESTED_POSTS = [
  {
    href: '/blog/2022/how-to-build-datepicker',
    title: 'How to build a datepicker from scratch',
    description: 'Building a nice datepicker with animations and gesture support',
    category: 'React',
  },
  {
    href: '/blog/2022/the-rising-multiframeworks-paradigm-frontend-development',
    title: 'The rise of multiframeworks paradigm in the frontend OSS',
    description:
      'Looking at the rising trend of libraries developed with support for many UI frameworks.',
    category: 'General',
  },
  {
    href: '/blog/2021/graphql-typescript-typeguards',
    title: 'GraphQL Typeguards',
    description:
      'Exploring a few helpful GraphQL-focused typeguards such as isType and isEither.',
    category: 'GraphQL',
  },
] as const

export function AccordionDemo() {
  return (
    <Accordion.Root className="w-full max-w-[600px]">
      <Accordion.Header className="text-lg font-medium text-slate-900 dark:text-slate-100">
        Other posts that might interest you
        <Accordion.Icon />
      </Accordion.Header>
      <Accordion.Panel>
        <ul>
          {SUGGESTED_POSTS.map((post, index) => (
            <li
              key={post.href}
              className={index === SUGGESTED_POSTS.length - 1 ? 'p-4' : 'border-b border-slate-200 p-4 dark:border-slate-800'}
            >
              <a
                href={post.href}
                className="flex w-full items-start justify-between gap-4"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <h4 className="text-md font-medium text-slate-900 dark:text-slate-100">
                    {post.title}
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {post.description}
                  </p>
                </div>
                <span className="shrink-0 whitespace-nowrap rounded-full border border-slate-200 bg-slate-100 px-2 py-1 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {post.category}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Accordion.Panel>
    </Accordion.Root>
  )
}
