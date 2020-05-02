import React from 'react'
import { Link } from '@chakra-ui/core'

interface BlueLinkProps {
	href: string
	text: string
}

export function BlueLink({ href, text }: BlueLinkProps) {
	return (
		<Link href={href} target='blank' mx={1} color='blue.400' fontWeight='500'>
			{text}
		</Link>
	)
}
