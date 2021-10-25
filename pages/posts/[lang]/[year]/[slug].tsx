import React, { useMemo } from 'react'
import path from 'path'
import fs from 'fs'
import { getFilesPath } from 'utils/files'
import { generateHeadingId } from 'utils/headingId'
import { NextSeo } from 'next-seo'
import { Header, PostContainer, TocDesktop } from 'components'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { formatISO } from 'date-fns'
import dynamic from 'next/dynamic'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { POSTS_PATH, COMPONENTS_PATH, mdxDefaultComponentsRegistry } from 'lib/mdx'
import type { PostMatterData } from 'lib/mdx'
import { CategoriesColorsRegistry } from 'styles/CategoriesColorsRegistry'

export default function PostPage({ headings, source, data, pageSpecificComponentsNames }) {
	const domain = 'https://nicolastoulemont.dev'
	const { description, date, imagePath, title } = data as PostMatterData
	const { asPath } = useRouter()
	const canonical = asPath === '/' ? `${domain}` : `${domain}${asPath}`

	const pageSpecificComponentRegistry = useMemo(
		() =>
			pageSpecificComponentsNames.reduce((acc, componentFileName) => {
				acc[componentFileName] = dynamic(() =>
					import(`../../../../components/mdx/${componentFileName}`).then(
						(mod) => mod[`${componentFileName}`]
					)
				)
				return acc
			}, {}),
		[]
	)
	const components = useMemo(
		() => ({ ...mdxDefaultComponentsRegistry, ...pageSpecificComponentRegistry }),
		[pageSpecificComponentRegistry]
	)

	return (
		<>
			<Head>
				{imagePath && (
					<>
						<meta content={`${domain}${imagePath}`} property='og:image' />
						<meta content={description} property='og:image:alt' />
					</>
				)}
				{date && date !== 'not_published' && (
					<>
						<meta content='article' property='og:type' />
						<meta
							content={formatISO(new Date(date))}
							property='article:published_time'
						/>
					</>
				)}
			</Head>
			<NextSeo
				title={title}
				description={description}
				openGraph={{
					type: 'article',
					description,
					url: canonical,
					title: title
				}}
				canonical={canonical}
			/>
			<Header isPostPage />
			<PostContainer>
				<MDXRemote {...source} components={components} />
			</PostContainer>
			<TocDesktop
				elements={headings}
				activeColor={
					CategoriesColorsRegistry[
						Array.isArray(data.category) ? data.category[0] : data.category
					]
				}
			/>
		</>
	)
}

export const getStaticProps = async ({ params }) => {
	const buffer = fs.readFileSync(
		path.join(POSTS_PATH, params.lang, params.year, `${params.slug}.mdx`)
	)
	const { content, data } = matter(buffer)

	const componentsFileNames = getFilesPath(COMPONENTS_PATH)
		.map((path) => path.replace(/\.tsx?$/, ''))
		.map((path) => `${path.split('mdx/')[1]}`)

	const pageSpecificComponentsNames = componentsFileNames.filter((componentFileName) =>
		content.includes(`<${componentFileName}`)
	)

	const source = await serialize(content, {
		mdxOptions: {
			rehypePlugins: [mdxPrism]
		},
		scope: data
	})

	const parseHeadings = /(#|##|###|####) (.*$)/gim

	function getType(heading: string) {
		if (heading.startsWith('####')) return 'h4'
		if (heading.startsWith('###')) return 'h3'
		if (heading.startsWith('##')) return 'h2'
		if (heading.startsWith('#')) return 'h1'
	}

	const headings = content.match(parseHeadings).map((heading) => {
		const content = heading.replace(/#/g, '').trim()
		return {
			id: generateHeadingId(content),
			type: getType(heading),
			content
		}
	})

	return {
		props: {
			pageSpecificComponentsNames,
			headings,
			source,
			data
		}
	}
}

export const getStaticPaths = async () => {
	const paths = getFilesPath(path.join(POSTS_PATH))
		.map((path) => path.replace(/\.mdx?$/, ''))
		.map((path) => `/posts${path.split('posts')[1]}`)

	return {
		paths,
		fallback: false
	}
}