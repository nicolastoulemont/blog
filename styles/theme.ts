import { extendTheme, ColorMode } from '@chakra-ui/react'

type CustomConfig = {
  initialColorMode: ColorMode
}

const config: CustomConfig = {
  initialColorMode: 'light',
}

export const theme = extendTheme({ config })
