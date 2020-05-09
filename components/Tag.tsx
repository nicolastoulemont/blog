import React from 'react'
import { Tag, useColorMode } from '@chakra-ui/core'
import { color } from '@theme/colors'

interface TagProps {
	size?: 'lg' | 'md' | 'sm'
}

export const TagWithHover: React.FunctionComponent<TagProps> = ({ size = 'md', children }) => {
	const { colorMode } = useColorMode()

	const bg = {
		light: '#90CDF4',
		dark: '#282c2e'
	}

	return (
		<Tag size={size} _hover={{ backgroundColor: bg[colorMode], color: color[colorMode] }}>
			{children}
		</Tag>
	)
}
