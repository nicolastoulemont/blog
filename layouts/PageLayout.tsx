import React from 'react'
import { NextSeo } from 'next-seo'
import { chakra, Link, useColorModeValue } from '@chakra-ui/react'
import { Header } from 'components'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { formatISO } from 'date-fns'
import { PostMatterData } from 'scripts/generate-post-list'
import NextLink from 'next/link'

const MotionBox = chakra(motion.div)

const variants = {
	visible: { opacity: 1 },
	hidden: { opacity: 0 }
}

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

export default function PageLayout({ children, frontMatter }) {
	const domain = 'https://nicolastoulemont.dev'
	const { description, date, imagePath, title } = frontMatter as PostMatterData
	const { asPath } = useRouter()
	const canonical = asPath === '/' ? `${domain}` : `${domain}${asPath}`

	const headerNodes = children.filter((childNode) => headers.includes(childNode.props.mdxType))

	const bgColor = useColorModeValue('white', '#1A212C')
	const boxShadowColor = useColorModeValue(
		'rgba(0, 0, 0, 0.12) 0px 3px 8px',
		'rgba(0, 0, 0, 1) 0px 3px 8px'
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
			<MotionBox
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
			</MotionBox>
			<MotionBox
				as='main'
				id='mdx-container'
				width='100%'
				px={3}
				minHeight='100%'
				maxWidth='1000px'
				margin='0 auto'
				variants={variants}
				initial='hidden'
				animate='visible'
			>
				{children}
			</MotionBox>
		</>
	)
}
