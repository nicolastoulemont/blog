import React from 'react'
import { Flex, Heading, Box, Text, Image, Link, Tag } from '@chakra-ui/react'
import { Card, Header } from 'components'
import { motion } from 'framer-motion'
import { GiHand } from 'react-icons/gi'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { NextSeo } from 'next-seo'
import { postsList } from 'data/lists'
import NextLink from 'next/link'

const MotionBox = motion.custom(Box)
const MotionLink = motion.custom(Link)

export default function HomePage() {
	return (
		<>
			<NextSeo title='Nicolas Toulemont' />
			<Header />
			<Box
				as='main'
				width='90%'
				minHeight='100%'
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
							<Heading as='h1' size='2xl' fontWeight={600}>
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
							alt: 'blog_author',
							width: '200px'
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
					{postsList.map((post) => (
						<NextLink href={post.url} passHref key={post.url}>
							<MotionLink
								width='98.5%'
								margin='0 auto'
								border='1px solid'
								borderColor='gray.300'
								boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
								rounded='md'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								whileHover={{ scale: 1.01 }}
								whileTap={{ scale: 0.99 }}
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
											<Text color='gray.500'>{post.date}</Text>
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
									<Image
										width={{ base: '80%', sm: '20%', md: '15%' }}
										mx={{ base: 'auto', sm: 0 }}
										mb={{ base: 3, sm: 0 }}
										src={post.imagePath}
										fallbackSrc={post.imagePath}
										rounded='md'
									/>
								</Flex>
							</MotionLink>
						</NextLink>
					))}
				</Flex>
			</Box>
		</>
	)
}
