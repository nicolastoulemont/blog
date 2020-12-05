import React from 'react'
import { NextSeo } from 'next-seo'
import { chakra } from '@chakra-ui/react'
import { Header } from 'components'
import { motion } from 'framer-motion'
const MotionBox = chakra(motion.div)
export default function PageLayout({ children, frontMatter }) {
	return (
		<>
			<NextSeo {...frontMatter} openGraph={{ description: frontMatter.description }} />
			<Header />
			<MotionBox
				// @ts-ignore
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
