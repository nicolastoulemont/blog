import Head from 'next/head'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import fs from 'fs'

export async function getStaticProps() {
	const files = fs.readdirSync('posts')
	return {
		props: {
			slugs: files.map((filename) => filename.replace('.md', ''))
		}
	}
}

export default function Home({ slugs }) {
	return (
		<div>
			{slugs.map((slug) => (
				<NextLink href={`/blog/${slug}`} key={slug}>
					<Link>{slug}</Link>
				</NextLink>
			))}
		</div>
	)
}
