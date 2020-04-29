import Layout from '@components/Layout'
import Link from 'next/link'
import fs from 'fs'

export default function IndexPage({ slugs }: { slugs: Array<string> }) {
	return (
		<Layout title='Home | Next.js + TypeScript Example'>
			<h1>Hello Next.js 👋</h1>
			<div>
				{slugs.map((slug: string) => (
					<div key={slug}>
						<Link key={slug} href='/blog/[slug]' as={`/blog/${slug}`}>
							<a>{slug}</a>
						</Link>
					</div>
				))}
			</div>
		</Layout>
	)
}

export async function getStaticProps() {
	const files = fs.readdirSync('posts')
	const slugs = files.map((fileName) => fileName.split('.')[0])
	return {
		props: {
			slugs
		}
	}
}
