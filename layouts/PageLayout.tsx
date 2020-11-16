import React from 'react'
import { NextSeo } from 'next-seo'
import { Box } from '@chakra-ui/react'
import { Header } from 'components'
import { motion } from 'framer-motion'
const MotionBox = motion.custom(Box)
export default function PageLayout({ children, frontMatter }) {
	return (
		<>
			<NextSeo {...frontMatter} />
			<Header />
			<MotionBox
				// @ts-ignore
				as='main'
				width='100%'
				px={{ base: 3, sm: 0 }}
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
