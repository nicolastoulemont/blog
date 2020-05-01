import React from 'react'
import Layout from '@components/Layout'
import { Flex, Heading, Image, Box, Text, Tag } from '@chakra-ui/core'
import { withApollo } from 'lib/apollo'
import { usePostQuery } from 'generated/graphql'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { imgUrl, DATE_FORMAT } from 'utils/index'
import Link from 'next/link'
import { Markdown } from '@components/Markdown'

export default withApollo(function Post() {
	const router = useRouter()
	const { id } = router.query
	const { data } = usePostQuery({ variables: { id: id as string } })

	const post = data?.post
	const keywords = post?.categories?.map((category) => category?.name).join(',')

	return (
		<Layout title={post?.title} description={post?.description} keywords={keywords}>
			<Flex align='flex-start' justify='space-between'>
				<Box>
					<Heading as='h1' fontSize={['md', '2xl']}>
						{post?.title}
					</Heading>
					<Flex align='center' justify='left' mt={[2, 4]}>
						<Link href='/me'>
							<a>
								<Image
									src='/img/personal_picture.jpg'
									alt='author_picture'
									borderRadius='50%'
									width='35px'
								/>
							</a>
						</Link>
						{post?.published_at && (
							<Text ml={4} fontSize='xs'>
								{format(new Date(post?.published_at), DATE_FORMAT)}
							</Text>
						)}
					</Flex>
					<Flex align='center' justify='left' mt={[2, 4]}>
						{post?.categories?.map((category) => (
							<Tag size='sm' mr={2} key={category?.name}>
								{category?.name}
							</Tag>
						))}
					</Flex>
				</Box>

				<Image
					src={imgUrl(post?.image?.url as string)}
					width={['50px', '150px']}
					borderRadius='4px'
				/>
			</Flex>
			<Markdown content={post?.content} />
		</Layout>
	)
})
