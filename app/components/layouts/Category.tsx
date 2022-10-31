import React from 'react'
import type { CategoryList } from 'scripts/generate-post-list'
import { Heading } from '@chakra-ui/react'
import { Post } from './Post'

export function Category({ categoryList }: { categoryList: CategoryList }) {
	return (
		<>
			<Heading mt={4} mb={2} as='h2' size='md'>
				{categoryList.category}
			</Heading>

			{categoryList.posts.map((post) => (
				<Post key={post.title} post={post} />
			))}
		</>
	)
}
