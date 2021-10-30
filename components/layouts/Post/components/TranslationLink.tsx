import React from 'react'
import type { PostData } from '../types'
import NextLink from 'next/link'
import { Image, Link } from '@chakra-ui/react'

export function TranslationLink({ post }: { post: PostData }) {
	return (
		<NextLink href={post.translationSlug} passHref>
			<Link
				zIndex={3}
				pos='absolute'
				right='15px'
				top='-15px'
				width='30px'
				height='auto'
				aria-label='translation link'
			>
				<Image
					src={`/img/flag_${post.translation}.svg`}
					width='100%'
					height='auto'
					alt={post.translation}
				/>
			</Link>
		</NextLink>
	)
}
