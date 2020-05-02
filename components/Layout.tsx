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
	title = 'Nicolas Toulemont - Full Stack Software Developer',
	description = 'Technical content about web development, Typescript, GraphQL and React',
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
				<link rel='manifest' href='/manifest.json' />
				<link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
				<link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
				<link rel='apple-touch-icon' href='/apple-icon.png'></link>
				<meta name='theme-color' content='#8e9193' />
			</Head>
			<style jsx global>
				{`
					* {
						box-sizing: border-box;
					}

					html,
					body,
					#__next {
						height: 100%;
						width: 100%;
					}

					main {
						height: 100%;
						width: 100%;
						overflow: auto;
					}

					nav {
						height: 60px;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				`}
			</style>

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
