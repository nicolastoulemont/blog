import React, { useState, useMemo } from 'react'
import {
	Flex,
	Heading,
	Box,
	Text,
	Input,
	chakra,
	useColorModeValue,
	Divider,
	Tag
} from '@chakra-ui/react'
import { Header } from 'components'
import { motion, AnimatePresence } from 'framer-motion'
import { NextSeo } from 'next-seo'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { generatePublishedPostList, CategoryList } from 'scripts/generate-post-list'
import { CategoriesColorsRegistry } from 'styles/CategoriesColorsRegistry'

const MotionLink = chakra(motion.a)

export async function getStaticProps() {
	const postByCategories = generatePublishedPostList()

	return {
		props: {
			postByCategories
		}
	}
}

export default function HomePage({ postByCategories }: { postByCategories: Array<CategoryList> }) {
	const [search, setSearch] = useState('')
	const focusColor = useColorModeValue('black', 'white')
	const dateColor = useColorModeValue('gray.600', 'gray.400')

	const filteredPostByCategories = useMemo(() => {
		let filteredCategories: Array<CategoryList> = []
		const query = search.toLowerCase()
		for (const category of postByCategories) {
			const matchedPosts = category.posts.filter(
				(post) =>
					post.title.toLowerCase().includes(query) ||
					post.description.toLowerCase().includes(query) ||
					category.category.toLowerCase().includes(query)
			)
			if (matchedPosts.length > 0) {
				filteredCategories.push({
					category: category.category,
					posts: matchedPosts.sort(
						(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
					)
				})
			}
		}

		return filteredCategories
	}, [search, postByCategories])

	return (
		<>
			<NextSeo title="Nicolas Toulemont's blog" />
			<Header />
			<Box
				as='main'
				width='100%'
				maxWidth='1000px'
				margin='0 auto'
				pb={8}
				boxSizing='border-box'
				px={{ base: 3, lg: 0 }}
			>
				<Heading
					as='h1'
					mt={{ base: 6, md: 12 }}
					mb={6}
					size='2xl'
					textAlign={{ base: 'center', md: 'left' }}
					fontWeight='bold'
					color={focusColor}
				>
					Hi, I'm Nicolas Toulemont
				</Heading>
				<Text
					fontSize={{ base: '1rem', md: '1.5rem' }}
					textAlign={{ base: 'center', md: 'left' }}
					fontWeight='bold'
					color={dateColor}
					mb={{ base: 9, md: 12 }}
				>
					I'm a french full stack software developer. I mainly use and enjoy Typescript,
					Node, React and GraphQL at the moment.
				</Text>
				<Flex width='100%' flexDir='column' align='flex-start' justify='flex-start' my={6}>
					<Heading size='lg' mb={6}>
						Posts
					</Heading>
					<Input
						placeholder='Search posts'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Divider my={6} />
					<AnimatePresence>
						{filteredPostByCategories.length > 0 ? (
							filteredPostByCategories.map((category) => (
								<Category key={category.category} categoryList={category} />
							))
						) : (
							<Text>Sorry, no post match this search</Text>
						)}
					</AnimatePresence>
				</Flex>
			</Box>
		</>
	)
}

function Category({ categoryList }: { categoryList: CategoryList }) {
	return (
		<>
			<Heading mt={4} mb={2} as='h2' size='md'>
				{categoryList.category}
			</Heading>

			{categoryList.posts.map((post) => (
				<Post key={post.title} post={post} />
			))}
		</>
	)
}

function Post({ post }: { post: CategoryList['posts'][number] }) {
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
						<Heading as='h3' size='sm'>
							{post.title}
						</Heading>
						<Flex width='100%' mt={1} mb={3}>
							<Text color={dateColor} fontSize='sm'>
								{post.date}
							</Text>
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
