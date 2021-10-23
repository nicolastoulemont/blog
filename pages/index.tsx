import React, { useState, useMemo } from 'react'
import { Header, Category, Main } from 'components'
import { AnimatePresence } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { generatePublishedPostList, CategoryList } from 'scripts/generate-post-list'
import { Flex, Heading, Text, Input, useColorModeValue, Divider, Box } from '@chakra-ui/react'

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
			<Main>
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
			</Main>
		</>
	)
}
