import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import marked from 'marked'
import { Styles } from 'styles'
export async function getStaticPaths() {
	const files = fs.readdirSync('posts')
	return {
		paths: files.map((filename) => ({
			params: {
				slug: filename.replace('.md', '')
			}
		})),
		fallback: false
	}
}

export async function getStaticProps({ params: { slug } }) {
	const markdown = fs.readFileSync(path.join('posts', `${slug}.md`)).toString()
	const { data, content } = matter(markdown)
	const html = marked(content)
	return {
		props: {
			slug,
			data,
			html
		}
	}
}

export default function Post({ slug, data, html }) {
	return (
		<>
			<Head>
				<title>{data.title}</title>
				<meta name='description' content={data.description} />
			</Head>
			<div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
				<h1>The slug for the this page is : {slug} </h1>
				<div dangerouslySetInnerHTML={{ __html: html }} />
				<Styles />
			</div>
		</>
	)
}
