import React from 'react'
import { Link } from '@chakra-ui/core'
import { TagWithHover } from './Tag'

interface CategoryProps {
	name: string
	link: string
	margin?: 'left' | 'right'
}

export function Category({ name, link, margin = 'left' }: CategoryProps) {
	return (
		<Link
			href={link}
			ml={margin === 'left' ? 2 : 0}
			mr={margin === 'right' ? 2 : 0}
			isExternal={true}
			rel='noopener'
		>
			<TagWithHover size='sm'>{name}</TagWithHover>
		</Link>
	)
}
