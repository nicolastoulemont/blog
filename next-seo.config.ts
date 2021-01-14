import { NextSeoProps } from 'next-seo'

const NextSeoConfig: NextSeoProps = {
	title: 'Nicolas Toulemont blog',
	description: 'Web development content about React, Typescript, GraphQL, Node',
	canonical: 'https://nicolastoulemont.dev',
	openGraph: {
		type: 'website',
		locale: 'en-US',
		url: 'https://nicolastoulemont.dev',
		site_name: 'Nicolas Toulemont blog',
		title: 'Nicolas Toulemont blog',
		description: 'Web development content about React, Typescript, GraphQL, Node'
	},
	twitter: {
		handle: '@NicoToulemont',
		site: '@NicoToulemont',
		cardType: 'summary_large_image'
	}
}

export default NextSeoConfig
