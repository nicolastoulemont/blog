import { Link } from '@remix-run/react'
import { PostMetaData } from '~/utils/files/types'
import { Tag } from './Tag'

export function Card({ post }: { post: PostMetaData }) {
  return (
    <li
      key={post.slug}
      style={{ transition: 'box-shadow 0.3s ease-in-out' }}
      className={`block h-full w-full rounded-lg shadow-xl hover:shadow-2xl ${
        post.translation ? 'relative' : ''
      }`}
    >
      {post.translation && (
        <Link
          to={post.translationSlug as string}
          className="absolute"
          style={{ top: 0, right: 15, width: 30 }}
        >
          <img
            src={`/img/flag_${post.translation}.svg`}
            width="100%"
            alt={post.translation}
          />
        </Link>
      )}
      <Link
        to={post.slug}
        className="my-3 flex flex-col-reverse items-center justify-center p-6 md:flex-row md:justify-between"
      >
        <article className="w-full text-slate-800 dark:text-white sm:w-3/4 sm:pt-0">
          <h4 className="text-md mb-1 font-bold">{post.title}</h4>
          <div className="mb-3 flex flex-row items-center justify-start">
            <div className="flex flex-row items-center space-x-2">
              {post.categories?.map((category) => (
                <Tag key={category} category={category} size="sm" />
              ))}
            </div>

            <p className="ml-3 text-xs">{post['article:published_time']}</p>
          </div>

          <p className="text-sm">{post.description}</p>
        </article>
        <div className="my-6 flex w-full items-center justify-center md:w-14  md:py-0">
          <img
            className="mx-auto w-24 md:mx-0 md:w-14"
            src={post['og:image']}
            alt={post['og:image:alt']}
            width={post['og:image:width']}
            height={post['og:image:height']}
          />
        </div>
      </Link>
    </li>
  )
}
