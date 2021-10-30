import { Heading, useColorModeValue, Box, Flex, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import type { PostData } from '../types'
import React from 'react'

export function Content({ post }: { post: PostData }) {
	const dateColor = useColorModeValue('gray.700', 'gray.200')
	return (
		<Flex
			as='article'
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
					<Text color={dateColor} fontSize='sm' as='time' dateTime={post.date}>
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
	)
}
