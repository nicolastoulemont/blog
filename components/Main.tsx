import React from 'react'
import { useColorMode, Box } from '@chakra-ui/core'
import { color, panelBgColor } from '@theme/colors'
import { Header } from './Header'
import { Footer } from './Footer'

export const Main: React.FunctionComponent = ({ children }) => {
	const { colorMode } = useColorMode()
	return (
		<main
			style={{
				color: color[colorMode],
				backgroundColor: panelBgColor[colorMode]
			}}
		>
			<Header />
			<Box width='90%' minHeight='calc(100% - 104px)' maxWidth='850px' margin='0 auto' pb={8}>
				{children}
			</Box>
			<Footer />
		</main>
	)
}
