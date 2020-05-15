import React from 'react'
import { Link } from '@chakra-ui/core'

interface BlueExternalLinkProps {
	href: string
	text: string
}

export function BlueExternalLink({ href, text }: BlueExternalLinkProps) {
	return (
		<Link href={href} target='blank' rel='noopener' mx={1} color='blue.400' fontWeight='500'>
			{text}
		</Link>
	)
}
