import React, { useMemo } from 'react'
import path from 'path'
import fs from 'fs'
import { getFilesPath } from 'utils/files'
import { useColorModeValue } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { Header, Main } from 'components'
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

const headers = ['h2', 'h3', 'h4']
const paddingLeftRegistry = {
	h2: 0,
	h3: 6,
	h4: 12
}
const fontSizeRegistry = {
	h2: 18,
	h3: 16,
	h4: 14
}

const marginYRegistry = {
	h2: 2,
	h3: 1
}

export default function PostPage({ source, data, pageSpecificComponentsNames }) {
	const domain = 'https://nicolastoulemont.dev'
	const { description, date, imagePath, title } = data as PostMatterData
	const { asPath } = useRouter()
	const canonical = asPath === '/' ? `${domain}` : `${domain}${asPath}`

	// const headerNodes = source.filter((childNode) => headers.includes(childNode.props.mdxType))

	const bgColor = useColorModeValue('white', '#1A212C')
	const boxShadowColor = useColorModeValue(
		'rgba(0, 0, 0, 0.12) 0px 3px 8px',
		'rgba(0, 0, 0, 1) 0px 3px 8px'
	)

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
			{/* <MotionBox
				pos='fixed'
				top='30%'
				maxW='250px'
				right='5px'
				display={{ base: 'none', xl: 'flex' }}
				flexDir='column'
				bgColor={bgColor}
				boxShadow={boxShadowColor}
				p={6}
				borderRadius={8}
			>
				{headerNodes.map((node) => (
					<NextLink href={`#${node.props.id}`} key={node.props.children}>
						<Link
							as='a'
							pl={paddingLeftRegistry[node.props.mdxType]}
							fontSize={fontSizeRegistry[node.props.mdxType]}
							marginY={marginYRegistry[node.props.mdxType] || 0}
						>
							{node.props.children}
						</Link>
					</NextLink>
				))}
			</MotionBox> */}
			<Main>
				<MDXRemote {...source} components={components} />
			</Main>
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

	console.log(content)
	console.log(source)

	return {
		props: {
			source,
			data,
			pageSpecificComponentsNames
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
