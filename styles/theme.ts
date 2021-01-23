// theme.js
// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'
// 2. Add your color mode config
const config = {
	initialColorMode: 'light',
	useSystemColorMode: process.env.NODE_ENV === 'production' ? true : false
}
// 3. extend the theme
export const theme = extendTheme({ config })
