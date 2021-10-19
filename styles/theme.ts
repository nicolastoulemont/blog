import { extendTheme, ColorMode } from '@chakra-ui/react'

type CustomConfig = {
	initialColorMode: ColorMode
	useSystemColorMode: boolean
}

const config: CustomConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: process.env.NODE_ENV === 'production'
}

export const theme = extendTheme({ config })
