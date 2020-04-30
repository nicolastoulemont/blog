import Layout from '@components/Layout'
import { Flex, Heading, PseudoBox, Text } from '@chakra-ui/core'
import { GiHand } from 'react-icons/gi'
import { withApollo } from 'lib/apollo'
import Link from 'next/link'
import Card from 'layouts/Card'
import { usePostsQuery } from 'generated/graphql'

export default withApollo(function IndexPage() {
	const { data } = usePostsQuery()

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
				{data?.posts?.map((post) => (
					<Link
						key={post?.id}
						href='/blog/[id]/[slug]'
						as={`/blog/${post?.id}/${post?.slug}`}
					>
						<a>
							<p>{post?.title}</p>
							<p>{post?.description}</p>
						</a>
					</Link>
				))}
			</div>
		</Layout>
	)
})
