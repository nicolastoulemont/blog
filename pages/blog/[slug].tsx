import React from 'react'
import Layout from '@components/Layout'
import matter from 'gray-matter'
import marked from 'marked'
import path from 'path'
import fs from 'fs'

export default function Post({ html, data }: any) {
	return (
		<Layout title={data.title}>
			<div>
				<h2>Content below</h2>
				<div dangerouslySetInnerHTML={{ __html: html }} />
			</div>
		</Layout>
	)
}

export async function getStaticPaths() {
	const files = fs.readdirSync('posts')
	const paths = files.map((fileName) => ({
		params: {
			slug: fileName.split('.')[0]
		}
	}))
	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params: { slug } }: any) {
	const raw = fs.readFileSync(path.join('posts', slug + '.md')).toString()
	const parsed = matter(raw)
	const html = marked(parsed.content)

	return {
		props: {
			html,
			data: parsed.data
		}
	}
}
