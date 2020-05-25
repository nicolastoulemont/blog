import React from 'react'
import { usePostsQuery } from 'generated/graphql'
import { Heading, Box, Text } from '@chakra-ui/core'
import ListItem from '@components/ListItem'

export function Articles() {
	const { data } = usePostsQuery()

	return (
		<Box mt={8} maxHeight='500px' overflowY='auto'>
			<Heading as='h2' size='lg' mb={[4, 8]} textAlign='left' fontWeight='600'>
				Latest Articles
			</Heading>
			{!data || (data?.posts?.length === 0 && <Text>No posts yet</Text>)}
			{data?.posts?.map((post) => (
				<ListItem {...(post as any)} key={post?.id} />
			))}
		</Box>
	)
}
