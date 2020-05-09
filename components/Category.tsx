import React from 'react'
import { Link } from '@chakra-ui/core'
import { TagWithHover } from './Tag'

interface CategoryProps {
	name: string
	link: string
}

export function Category({ name, link }: CategoryProps) {
	return (
		<Link href={link} ml={2} target='_blank'>
			<TagWithHover size='sm'>{name}</TagWithHover>
		</Link>
	)
}
