import React, { useMemo } from 'react'
import path from 'path'
import fs from 'fs'
import { getFilesPath } from 'utils/files'
import { generateHeaderId } from 'utils/headerId'
import { NextSeo } from 'next-seo'
import { Header, Main, SideBarNav } from 'components'
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

export default function PostPage({ headers, source, data, pageSpecificComponentsNames }) {
	const domain = 'https://nicolastoulemont.dev'
	const { description, date, imagePath, title } = data as PostMatterData
	const { asPath } = useRouter()
	const canonical = asPath === '/' ? `${domain}` : `${domain}${asPath}`

	const pageSpecificComponentRegistry = useMemo(
		() =>
			pageSpecificComponentsNames.reduce((acc, componentFileName) => {
				acc[componentFileName] = dynamic(() =>
					import(`../../../components/mdx/${componentFileName}`).then(
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
			<Header />
			<Main>
				<MDXRemote {...source} components={components} />
			</Main>
			<SideBarNav
				headers={headers}
				hoverColor={
					CategoriesColorsRegistry[
						Array.isArray(data.category) ? data.category[0] : data.category
					]
				}
			/>
		</>
	)
}

export const getStaticProps = async ({ params }) => {
	const buffer = fs.readFileSync(path.join(POSTS_PATH, params.year, `${params.slug}.mdx`))
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

	const parseHeaders = /(#|##|###|####) (.*$)/gim

	function getType(header: string) {
		if (header.startsWith('####')) return 'h4'
		if (header.startsWith('###')) return 'h3'
		if (header.startsWith('##')) return 'h2'
		if (header.startsWith('#')) return 'h1'
	}

	const headers = content.match(parseHeaders).map((header) => {
		const content = header.replace(/#/g, '').trim()
		return {
			id: generateHeaderId(content),
			type: getType(header),
			content
		}
	})

	return {
		props: {
			pageSpecificComponentsNames,
			headers,
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
