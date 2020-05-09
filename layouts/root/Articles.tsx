import React from 'react'
import { usePostsQuery } from 'generated/graphql'
import Link from 'next/link'
import { Flex, Image, Heading, Box, Text, PseudoBox, useColorMode } from '@chakra-ui/core'
import { hoverColor } from '@theme/colors'
import { Category } from '@components/Category'

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
				<PseudoBox
					key={post?.id}
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
					<Link href='/blog/[id]/[slug]' as={`/blog/${post?.id}/${post?.slug}`}>
						<a style={{ display: 'flex', flex: '1' }}>
							<Flex align='center' justify='left' width='100%'>
								<Image
									src={post?.image?.url}
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
						</a>
					</Link>

					<Flex align='center' justify='right' display={['none', 'flex']}>
						{post?.categories?.map((category) => (
							<Category
								key={category?.name.concat('-articles')}
								name={category?.name!}
								link={category?.link!}
							/>
						))}
					</Flex>
				</PseudoBox>
			))}
		</Box>
	)
}
