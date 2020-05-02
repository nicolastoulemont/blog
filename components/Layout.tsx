import * as React from 'react'
import Head from 'next/head'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import theme from '@theme/index'
import { Main } from './Main'
type Props = {
	title?: string
	description?: string
	keywords?: string
}

const Layout: React.FunctionComponent<Props> = ({
	children,
	title = 'Nicolas Toulemont - Blog',
	description = 'Technical content about web development',
	keywords = 'Typescript, GraphQL, Node, React'
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<meta name='description' content={description} />
				<meta name='keywords' content={'HTML, CSS, Javascript, '.concat(keywords)} />
				<meta name='author' content='Nicolas Toulemont' />
			</Head>

			<ThemeProvider theme={theme}>
				<CSSReset />
				<ColorModeProvider>
					<Main>{children}</Main>
				</ColorModeProvider>
			</ThemeProvider>
		</>
	)
}

export default Layout
