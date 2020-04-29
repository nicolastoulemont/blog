import React from 'react'
import Layout from '@components/Layout'
import matter from 'gray-matter'
import marked from 'marked'
import path from 'path'
import fs from 'fs'
import { Box, Flex } from '@chakra-ui/core'

export default function Post({ html, data }: any) {
	return (
		<Layout title={data.title}>
			<Flex align='center' direction='column' justify='center'>
				<h2>Content below</h2>
				<Box dangerouslySetInnerHTML={{ __html: html }}></Box>
			</Flex>
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
