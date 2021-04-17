// theme.js
// 1. import `extendTheme` function
import { extendTheme, ColorMode } from '@chakra-ui/react'
// 2. Add your color mode config

type CustomConfig = {
	initialColorMode: ColorMode
	useSystemColorMode: boolean
}

const config: CustomConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: process.env.NODE_ENV === 'production'
}
// 3. extend the theme
export const theme = extendTheme({ config })
