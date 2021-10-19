import type { CategoryList } from 'scripts/generate-post-list'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { Heading, useColorModeValue, chakra, Box, Flex, Text } from '@chakra-ui/react'
import NextImage from 'next/image'

const MotionLink = chakra(motion.a)

export function Post({ post }: { post: CategoryList['posts'][number] }) {
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
