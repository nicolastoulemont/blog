import * as React from 'react'
import Head from 'next/head'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import theme from '@theme/index'
import { Header } from './Header'
import { Main } from './Main'
type Props = {
	title?: string
}

const Layout: React.FunctionComponent<Props> = ({
	children,
	title = 'This is the default title'
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>

			<ThemeProvider theme={theme}>
				<CSSReset />
				<ColorModeProvider>
					<Header />
					<Main>{children}</Main>
				</ColorModeProvider>
			</ThemeProvider>
		</>
	)
}

export default Layout
