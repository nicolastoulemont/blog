import React from 'react'
import { useColorMode, Box } from '@chakra-ui/core'
import { color, panelBgColor } from '@theme/colors'

export const Main: React.FunctionComponent = ({ children }) => {
	const { colorMode } = useColorMode()
	return (
		<main style={{ color: color[colorMode], backgroundColor: panelBgColor[colorMode] }}>
			<Box width='66%' maxWidth='850px' margin='0 auto'>
				{children}
			</Box>
		</main>
	)
}
