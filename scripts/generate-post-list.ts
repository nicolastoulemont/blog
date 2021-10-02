import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { isValid } from 'date-fns'
import { Categories } from '../styles/CategoriesColorsRegistry'
import { flatten } from '@nicolastoulemont/utilities'
const root = process.cwd()

export interface PostMetaData {
	title: string
	date: string | 'not_published'
	slug: string
	snippet: string
	description: string
	imagePath: string
	imageAlt: string
	imageWidth: string
	imageHeight: string
	category: Categories | Array<Categories>
}

export type PostMatterData = Pick<
	PostMetaData,
	| 'date'
	| 'description'
	| 'category'
	| 'imageAlt'
	| 'imagePath'
	| 'imageHeight'
	| 'imageWidth'
	| 'snippet'
	| 'title'
>

function getFilesPath(dir) {
	let files = fs.readdirSync(dir)
	// @ts-ignore
	files = files.map((file) => {
		const filePath = path.join(dir, file)
		const stats = fs.statSync(filePath)
		if (stats.isDirectory()) return getFilesPath(filePath)
		else if (stats.isFile()) return filePath
	})

	return files.reduce((all, folderContents) => all.concat(folderContents), []) as Array<string>
}

export interface CategoryList {
	category: Categories
	posts: Array<PostMetaData>
}

export function generatePublishedPostList(): Array<CategoryList> {
	const filesPath = getFilesPath(path.join(root, 'pages', 'posts'))
	const publishedPosts = filesPath
		.map((filePath) => {
			const source = fs.readFileSync(filePath, 'utf8')
			const { data } = matter(source) as unknown as { data: PostMatterData }

			return {
				...data,
				slug: filePath.split('pages')[1].replace('.mdx', '')
			}
		})
		.filter((post) => isValid(new Date(post.date)))

	const publishedCategories = Array.from(
		new Set(flatten(publishedPosts.map((p) => p.category)))
	) as Array<Categories>

	const postByCategories: Array<CategoryList> = publishedCategories.reduce((acc, category) => {
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
	}, [])

	return postByCategories
}
