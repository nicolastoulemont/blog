import React from 'react'
import { Text, List, ListItem, Box, useColorMode } from '@chakra-ui/core'
import NextLink from 'next/link'
import { hoverColor } from '@theme/colors'

interface Serie {
	id: string
	description: string
	slug: string
	name: string
	posts: Array<{ id: string; slug: string; title: string }>
}

export function SerieItem({ serie }: { serie: Serie }) {
	const { colorMode } = useColorMode()

	return (
		<Box p='2' borderRadius='4px' border='1px' borderColor={hoverColor[colorMode]}>
			<NextLink href='/serie/[id]/[slug]' as={`/serie/${serie.id}/${serie.slug}`}>
				<a>
					<Text as='h4' fontSize='sm'>
						{serie.name}
					</Text>
				</a>
			</NextLink>
			<List p='2'>
				{serie.posts.map((post) => (
					<NextLink
						key={post.id}
						href='/blog/[id]/[slug]'
						as={`/blog/${post.id}/${post.slug}`}
					>
						<a>
							<ListItem
								fontSize='xs'
								backgroundColor={hoverColor[colorMode]}
								_hover={{
									backgroundColor: colorMode === 'light' ? 'gray.100' : null
								}}
								p='2'
								borderRadius='4px'
							>
								{post.title}
							</ListItem>
						</a>
					</NextLink>
				))}
			</List>
		</Box>
	)
}
