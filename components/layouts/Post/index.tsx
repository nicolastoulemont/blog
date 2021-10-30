import type { PostData } from './types'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import { CardContainer, Content, TranslationLink } from './components'

export function Post({ post }: { post: PostData }) {
	return (
		<CardContainer post={post}>
			{post.translation && <TranslationLink post={post} />}
			{post.translation ? (
				<NextLink href={post.slug} passHref>
					<Link width='100%' textDecoration='none' _hover={{ textDecoration: 'none' }}>
						<Content post={post} />
					</Link>
				</NextLink>
			) : (
				<Content post={post} />
			)}
		</CardContainer>
	)
}
