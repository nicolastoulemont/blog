import React from 'react'
import { Tag, useColorMode } from '@chakra-ui/core'
import { color } from '@theme/colors'

interface TagProps {
	size?: 'lg' | 'md' | 'sm'
	fontSize?: Array<string>
}

export const TagWithHover: React.FunctionComponent<TagProps> = ({
	size = 'md',
	fontSize = ['10px', '12px'],
	children
}) => {
	const { colorMode } = useColorMode()

	const bg = {
		light: '#90CDF4',
		dark: '#282c2e'
	}

	return (
		<Tag
			size={size}
			fontSize={fontSize}
			_hover={{
				transition: 'background-color 0.15s ease-in',
				backgroundColor: bg[colorMode],
				color: color[colorMode]
			}}
		>
			{children}
		</Tag>
	)
}
