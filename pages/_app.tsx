import React from 'react'
import { MDXWithChakraProvider } from '../components'
import { ChakraProvider } from '@chakra-ui/react'
import GlobalStyles from 'styles/global'
import { PrismGlobal } from 'styles/prism'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
				<meta name='msapplication-TileColor' content='#da532c'></meta>
				<meta name='theme-color' content='#ffffff'></meta>
			</Head>
			<ChakraProvider>
				<MDXWithChakraProvider>
					<DefaultSeo
						openGraph={{
							type: 'website',
							locale: 'en-US',
							url: 'https://nicolastoulemont.dev',
							site_name: 'Nicolas Toulemont blog'
						}}
						twitter={{
							handle: '@NicoToulemont',
							site: '@NicoToulemont',
							cardType: 'summary_large_image'
						}}
					/>
					<Component {...pageProps} />
					<GlobalStyles />
					<PrismGlobal />
				</MDXWithChakraProvider>
			</ChakraProvider>
		</>
	)
}
