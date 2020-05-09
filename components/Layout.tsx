import * as React from 'react'
import Head from 'next/head'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import theme from '@theme/index'
import { Main } from './Main'
type Props = {
	title?: string
	description?: string
	keywords?: string
	meta?: {
		id: string
		slug: string
		image: string
	}
}

export const Layout: React.FunctionComponent<Props> = ({
	children,
	title = 'Nicolas Toulemont - Full Stack Software Developer',
	description = 'Technical content about web development, Typescript, GraphQL and React',
	keywords = 'Typescript, GraphQL, Node, React',
	meta
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
				{/* Twitter */}
				<meta name='twitter:card' content='summary' />
				<meta name='twitter:site' content='@NicoToulemont' />
				<meta name='twitter:creator' content='@NicoToulemont' />
				<meta name='twitter:title' content={title} />
				<meta name='twitter:description' content={description} />
				{meta && <meta name='twitter:image' content={meta.image} />}
				{/* Open Graph */}
				<meta property='og:title' content={title} />
				<meta property='og:description' content={description} />
				<meta property='og:site_name' content='nicolastoulemont.dev' />
				{meta && (
					<>
						<meta
							property='og:url'
							content={`https://nicolastoulemont.dev/blog/${meta.id}/${meta.slug}`}
						/>
						<meta property='og:image' content={meta.image} />
					</>
				)}
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
