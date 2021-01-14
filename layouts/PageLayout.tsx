import React from 'react'
import { NextSeo } from 'next-seo'
import { chakra } from '@chakra-ui/react'
import { Header } from 'components'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { formatISO } from 'date-fns'

const MotionBox = chakra(motion.div)

export default function PageLayout({ children, frontMatter }) {
	const domain = 'https://nicolastoulemont.dev'
	const { description, date, cardImage, title } = frontMatter
	const { asPath } = useRouter()
	const canonical = asPath === '/' ? `${domain}` : `${domain}${asPath}`

	return (
		<>
			<Head>
				{cardImage && (
					<>
						<meta content={`${domain}${cardImage}`} property='og:image' />
						<meta content={description} property='og:image:alt' />
					</>
				)}
				{date && (
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
				openGraph={{
					description,
					url: canonical,
					title: title
				}}
				canonical={canonical}
			/>
			<Header />
			<MotionBox
				as='main'
				width='100%'
				px={3}
				minHeight='100%'
				maxWidth='1000px'
				margin='0 auto'
				pb={8}
				boxSizing='border-box'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				{children}
			</MotionBox>
		</>
	)
}
