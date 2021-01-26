import React from 'react'
import { Flex, Heading, Box, Text, Tag, chakra, useColorModeValue } from '@chakra-ui/react'
import { Card, Header } from 'components'
import { motion, AnimatePresence } from 'framer-motion'
import { GiHand } from 'react-icons/gi'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { NextSeo } from 'next-seo'
import { postsList } from 'data/lists'
import NextLink from 'next/link'
import NextImage from 'next/image'

const MotionBox = chakra(motion.div)
const MotionLink = chakra(motion.a)

export default function HomePage() {
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
				<Flex
					flexDirection={{ base: 'column-reverse', md: 'row' }}
					align='center'
					justify={{ base: 'center', md: 'space-between' }}
					pt={8}
				>
					<Flex direction='column' justify='center' mr={[0, 8]} mt={[8, 0]}>
						<Flex
							align='center'
							justify={{ base: 'center', md: 'left' }}
							mb={4}
							mt={{ base: 4, md: 0 }}
						>
							<Heading as='h1' size='2xl' fontWeight='bold'>
								Hey I'm Nicolas !
							</Heading>
							<MotionBox
								color='yellow.300'
								fontSize={40}
								ml={2}
								whileHover={{ rotate: [30, 0, 30, 0], scale: 1.5 }}
								_hover={{ cursor: 'pointer' }}
							>
								<GiHand />
							</MotionBox>
						</Flex>

						<Text fontSize='xl' textAlign={{ base: 'center', md: 'left' }}>
							I'm a french full stack software developer using Typescript, Node, React
							and GraphQL.
						</Text>
					</Flex>
					<Card
						img={{
							src: '/img/personal_picture.jpg',
							alt: 'blog author'
						}}
						links={[
							{
								text: 'Github',
								href: 'https://github.com/nicolastoulemont',
								external: true,
								icon: FaGithub
							},
							{
								text: 'Twitter',
								href: 'https://twitter.com/NicoToulemont',
								external: true,
								icon: FaTwitter
							}
						]}
					/>
				</Flex>
				<Flex width='100%' flexDir='column' align='flex-start' justify='flex-start' my={6}>
					<Heading as='h2'>Latest articles</Heading>
					<AnimatePresence>
						{postsList.map((post) => (
							<Post key={post.url} post={post} />
						))}
					</AnimatePresence>
				</Flex>
			</Box>
		</>
	)
}

function Post({ post }) {
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
		<NextLink href={post.url} passHref key={post.url}>
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
						width={{ base: '300px', sm: '100px', md: '140px' }}
						mx={{ base: 'auto', sm: 0 }}
						mb={{ base: 3, sm: 0 }}
						rounded='md'
						align='center'
						justify='center'
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
