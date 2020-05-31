import React from 'react'
import { Text, List, ListItem, Box, useColorMode, Image, Link } from '@chakra-ui/core'
import NextLink from 'next/link'
import { hoverColor } from '@theme/colors'
import { Serie } from 'utils/types'

export function SerieItem({ serie }: { serie: Serie }) {
	const { colorMode } = useColorMode()

	return (
		<Box p='2' borderRadius='4px' border='1px' borderColor={hoverColor[colorMode]}>
			<NextLink href='/serie/[id]/[slug]' as={`/serie/${serie.id}/${serie.slug}`}>
				<a style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
					<Image
						src={serie.image.url}
						alt={serie.image.alternativeText as string}
						borderRadius='4px'
						alignSelf='center'
						width='15px'
						mr={2}
					/>
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
						<Link my={2}>
							<ListItem
								fontSize='xs'
								backgroundColor={hoverColor[colorMode]}
								display='flex'
								alignItems='center'
								justifyContent='left'
								_hover={{
									backgroundColor: colorMode === 'light' ? 'gray.100' : null
								}}
								p='2'
								borderRadius='4px'
							>
								<Image
									src={post.image.url}
									alt={post.image.alternativeText as string}
									borderRadius='4px'
									alignSelf='center'
									width='15px'
									mr={2}
								/>
								{post.title}
							</ListItem>
						</Link>
					</NextLink>
				))}
			</List>
		</Box>
	)
}
