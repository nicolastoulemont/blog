import Layout from '@components/Layout'
import { Flex, Heading, PseudoBox, Text } from '@chakra-ui/core'
import { GiHand } from 'react-icons/gi'
import Link from 'next/link'
import Card from 'layouts/Card'
import fs from 'fs'

export default function IndexPage({ slugs }: { slugs: Array<string> }) {
	return (
		<Layout title='Home | Next.js + TypeScript Example'>
			<Flex align='center' justify='space-between' pt={8}>
				<Flex direction='column' justify='center' mr={8}>
					<Flex align='center' mb={4}>
						<Heading as='h1' fontWeight={600}>
							Hey I'm Nicolas !
						</Heading>
						<PseudoBox as={GiHand} color='yellow.300' fontSize={30} ml={2} />
					</Flex>
					<Text fontSize='lg'>
						I'm a full stack developper using Typescript, Node, React and GraphQL.
					</Text>
				</Flex>
				<Card />
			</Flex>

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
