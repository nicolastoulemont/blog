import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { isValid } from 'date-fns'
import type { Category, PostMetaData, PostMatterData } from 'lib/mdx'
import { flatten } from '@nicolastoulemont/utilities'
import { getFilesPath } from 'utils/files'

export interface CategoryList {
	category: Category
	posts: Array<PostMetaData>
}

export function generatePublishedPostList(): Array<CategoryList> {
	const filesPath = getFilesPath(path.join(process.cwd(), 'posts'))

	const publishedPosts = filesPath
		// For now we only show english posts and only add small link to the
		// translation on the card
		.filter((filePath) => !filePath.includes('posts/fr/'))
		.map((filePath) => {
			const source = fs.readFileSync(filePath, 'utf8')
			const { data } = matter(source) as unknown as { data: PostMatterData }

			const slug = `/posts${filePath.split('posts')[1].replace('.mdx', '')}`

			return {
				...data,
				...(data.translation && { translationSlug: slug.replace(/\/en\//, '/fr/') }),
				slug
			}
		})
		.filter((post) => isValid(new Date(post.date)))

	const publishedCategories = Array.from(
		new Set(flatten(publishedPosts.map((p) => p.category)))
	) as Array<Category>

	const postByCategories: Array<CategoryList> = publishedCategories.reduce(
		(acc: Array<CategoryList>, category) => {
			const categoryPosts = publishedPosts.filter((post) =>
				Array.isArray(post.category)
					? post.category.includes(category)
					: post.category === category
			)

			acc.push({
				category,
				posts: categoryPosts.sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
				)
			})

			return acc.sort((a, b) => (b.category > a.category ? -1 : 1))
		},
		[]
	)

	return postByCategories
}
