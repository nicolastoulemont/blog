import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { isValid } from 'date-fns'
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
	badges: Array<{ text: string; color: string }>
}

export type PostMatterData = Pick<
	PostMetaData,
	| 'date'
	| 'description'
	| 'badges'
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

export function generatePublishedPostList() {
	const filesPath = getFilesPath(path.join(root, 'pages', 'posts'))
	const filesFrontMatter = filesPath.map((filePath) => {
		const source = fs.readFileSync(filePath, 'utf8')
		const { data } = (matter(source) as unknown) as { data: PostMatterData }

		return {
			...data,
			slug: filePath.split('pages')[1].replace('.mdx', '')
		}
	})

	const publishedPosts = filesFrontMatter.filter((post) => isValid(new Date(post.date)))

	return publishedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
