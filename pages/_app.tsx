import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import GlobalStyles from 'styles/global'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import SeoConfig from 'next-seo.config'
import { theme } from 'styles/theme'
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <DefaultSeo {...SeoConfig} />
      <ChakraProvider resetCSS={true} theme={theme}>
        <Component {...pageProps} />
        <GlobalStyles />
      </ChakraProvider>
    </>
  )
}
