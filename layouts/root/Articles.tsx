import React from 'react'
import { usePostsQuery } from 'generated/graphql'
import Link from 'next/link'
import { Flex, Image, Heading, Box, Text, Tag, PseudoBox, useColorMode } from '@chakra-ui/core'
import { imgUrl } from 'utils'
import { hoverColor } from '@theme/colors'

export function Articles() {
	const { colorMode } = useColorMode()
	const { data } = usePostsQuery()

	return (
		<Box mt={8} maxHeight='500px' overflowY='auto'>
			<Heading as='h2' size='lg' mb={8} textAlign={['center', 'left']}>
				Latest Articles
			</Heading>
			{!data || (data?.posts?.length === 0 && <Text>No posts yet</Text>)}
			{data?.posts?.map((post) => (
				<Link
					key={post?.id}
					href='/blog/[id]/[slug]'
					as={`/blog/${post?.id}/${post?.slug}`}
				>
					<a>
						<PseudoBox
							display='flex'
							alignItems='center'
							justifyContent='space-between'
							py={3}
							px={4}
							mb={4}
							borderRadius='4px'
							_hover={{
								backgroundColor: hoverColor[colorMode]
							}}
						>
							<Flex align='center' justify='left'>
								<Image
									src={imgUrl(post?.image?.url as string)}
									alt={post?.image?.alternativeText as string}
									borderRadius='4px'
									alignSelf='center'
									width='35px'
									mr={6}
								/>
								<Text fontWeight='600' fontSize={['md', 'lg']}>
									{post?.title}
								</Text>
							</Flex>
							<Flex align='center' justify='right' display={['none', 'flex']}>
								{post?.categories?.map((category) => (
									<Tag size='sm' ml={2} key={category?.name.concat('-article')}>
										{category?.name}
									</Tag>
								))}
							</Flex>
						</PseudoBox>
					</a>
				</Link>
			))}
		</Box>
	)
}
