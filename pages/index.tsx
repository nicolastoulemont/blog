import React from 'react'
import { Flex, Heading, Box, Text, Tag, chakra, useColorModeValue } from '@chakra-ui/react'
import { Header } from 'components'
import { motion, AnimatePresence } from 'framer-motion'
import { NextSeo } from 'next-seo'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { generatePublishedPostList, PostMetaData } from 'scripts/generate-post-list'
const MotionLink = chakra(motion.a)

export async function getStaticProps() {
	const publishedPosts = generatePublishedPostList()

	return {
		props: {
			publishedPosts
		}
	}
}

export default function HomePage({ publishedPosts }: { publishedPosts: Array<PostMetaData> }) {
	const focusColor = useColorModeValue('black', 'white')
	const dateColor = useColorModeValue('gray.600', 'gray.400')

	return (
		<>
			<NextSeo title="Nicolas Toulemont's blog" />
			<Header />
			<Box
				as='main'
				width='100%'
				px={3}
				maxWidth='1000px'
				margin='0 auto'
				pb={8}
				boxSizing='border-box'
			>
				<Heading
					as='h1'
					my={{ base: 6, md: 12 }}
					size='2xl'
					textAlign={{ base: 'center', md: 'left' }}
					fontWeight='bold'
					color={focusColor}
				>
					Hi, I'm Nicolas Toulemont
				</Heading>
				<Text
					fontSize={{ base: '1.5rem', md: '2rem' }}
					textAlign={{ base: 'center', md: 'left' }}
					fontWeight='bold'
					color={dateColor}
					mb={{ base: 9, md: 12 }}
				>
					I'm a french full stack software developer. I mainly use and enjoy Typescript,
					Node, React and GraphQL at the moment.
				</Text>
				<Flex width='100%' flexDir='column' align='flex-start' justify='flex-start' my={6}>
					<Heading as='h2'>Latest posts</Heading>
					<AnimatePresence>
						{publishedPosts.map((post) => (
							<Post key={post.slug} post={post} />
						))}
					</AnimatePresence>
				</Flex>
			</Box>
		</>
	)
}

function Post({ post }: { post: PostMetaData }) {
	const dateColor = useColorModeValue('gray.700', 'gray.200')
	const boxShadowColor = useColorModeValue(
		'rgba(0, 0, 0, 0.12) 0px 3px 8px',
		'rgba(0, 0, 0, 1) 0px 3px 8px'
	)
	const whileHoverboxShadowColor = useColorModeValue(
		'rgba(0, 0, 0, 0.12) 0px 8px 12px',
		'rgba(0, 0, 0, 1) 0px 8px 12px'
	)

	return (
		<NextLink href={post.slug} passHref key={post.slug}>
			<MotionLink
				layout
				width='100%'
				boxShadow={boxShadowColor}
				rounded='md'
				initial={{ opacity: 0.5 }}
				animate={{ opacity: 1 }}
				transition='box-shadow 0.3s ease-in-out'
				_hover={{
					boxShadow: whileHoverboxShadowColor
				}}
				p={6}
				my={3}
			>
				<Flex
					width='100%'
					flexDir={{ base: 'column-reverse', sm: 'row' }}
					align={{ base: 'center', sm: 'flex-start' }}
					justify={{ base: 'center', sm: 'space-between' }}
				>
					<Box width={{ base: '100%', sm: '75%' }}>
						<Heading as='h3' size='lg'>
							{post.title}
						</Heading>
						<Flex width='100%' mt={3} mb={6}>
							<Text color={dateColor}>{post.date}</Text>
							{post.badges.map((badge) => (
								<Tag
									ml={2}
									display='flex'
									alignItems='center'
									justifyContent='center'
									colorScheme={badge.color}
									borderRadius='4px'
									size='sm'
									key={badge.text}
								>
									{badge.text}
								</Tag>
							))}
						</Flex>
						<Text>{post.snippet}</Text>
					</Box>
					<Flex
						width={{ base: 'calc(100vw - 80px)', sm: '100px', md: '140px' }}
						mx={{ base: 'auto', sm: 0 }}
						mb={{ base: 3, sm: 0 }}
						rounded='md'
						align='center'
						justify='center'
						boxSizing='border-box'
					>
						<NextImage
							width={post.imageWidth}
							height={post.imageHeight}
							src={post.imagePath}
							priority
							alt={post.imageAlt}
						/>
					</Flex>
				</Flex>
			</MotionLink>
		</NextLink>
	)
}
