import type { PostData } from '../types'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { useColorModeValue, chakra } from '@chakra-ui/react'
import { ReactNode } from 'react'

const MotionBox = chakra(motion.div)
const MotionLink = chakra(motion.a)

interface PostCardProps {
	post: PostData
	children: ReactNode
}

export function CardContainer({ post, children }: PostCardProps) {
	if (post.translation) {
		return <TranslatedPostCardContainer post={post}>{children}</TranslatedPostCardContainer>
	}

	return <LinkCardContainer post={post}>{children}</LinkCardContainer>
}

function LinkCardContainer({ post, children }: PostCardProps) {
	const boxShadowColor = useColorModeValue(
		'rgba(0, 0, 0, 0.12) 0px 3px 8px',
		'rgba(0, 0, 0, 1) 0px 3px 8px'
	)
	const whileHoverboxShadowColor = useColorModeValue(
		'rgba(0, 0, 0, 0.12) 0px 8px 12px',
		'rgba(0, 0, 0, 1) 0px 8px 12px'
	)
	return (
		<NextLink href={post.slug} passHref>
			<MotionLink
				key={post.slug}
				aria-label='article link'
				display='flex'
				pos='relative'
				layout
				width='100%'
				boxShadow={boxShadowColor}
				rounded='md'
				p={6}
				my={3}
				initial={{ opacity: 0.5 }}
				animate={{ opacity: 1 }}
				transition='box-shadow 0.3s ease-in-out'
				_hover={{
					boxShadow: whileHoverboxShadowColor
				}}
			>
				{children}
			</MotionLink>
		</NextLink>
	)
}

function TranslatedPostCardContainer({ post, children }: PostCardProps) {
	const boxShadowColor = useColorModeValue(
		'rgba(0, 0, 0, 0.12) 0px 3px 8px',
		'rgba(0, 0, 0, 1) 0px 3px 8px'
	)
	const whileHoverboxShadowColor = useColorModeValue(
		'rgba(0, 0, 0, 0.12) 0px 8px 12px',
		'rgba(0, 0, 0, 1) 0px 8px 12px'
	)
	return (
		<MotionBox
			key={post.slug}
			display='flex'
			pos='relative'
			layout
			width='100%'
			boxShadow={boxShadowColor}
			rounded='md'
			p={6}
			my={3}
			initial={{ opacity: 0.5 }}
			animate={{ opacity: 1 }}
			transition='box-shadow 0.3s ease-in-out'
			_hover={{
				boxShadow: whileHoverboxShadowColor
			}}
		>
			{children}
		</MotionBox>
	)
}
