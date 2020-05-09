import React from 'react'
import { Layout } from '@components/Layout'
import { Flex, Heading, Image, Box, Text, Link } from '@chakra-ui/core'
import { withApollo } from 'lib/apollo'
import { usePostQuery } from 'generated/graphql'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { DATE_FORMAT } from 'utils/index'
import NextLink from 'next/link'
import { Markdown } from '@components/Markdown'
import { Category } from '@components/Category'

export default withApollo(function Post() {
	const router = useRouter()
	const { id } = router.query
	const { data } = usePostQuery({ variables: { id: id as string } })
	const post = data?.post
	const keywords = post?.categories?.map((category) => category?.name).join(',')
	const url = `https://nicolastoulemont.dev${router.asPath}`
	const twitterLink = `https://twitter.com/intent/tweet?text=${post?.title}&url=${url}&via=NicoToulemont&hash=${keywords}`

	return (
		<Layout
			title={post?.title}
			description={post?.description}
			keywords={keywords}
			meta={{
				id: post?.id as string,
				slug: post?.slug as string,
				image: post?.image?.url as string
			}}
		>
			<Flex
				align='flex-start'
				justify='space-between'
				width='100%'
				boxSizing='border-box'
				p={1}
			>
				<Box>
					<Heading as='h1' fontSize={['md', '2xl']}>
						{post?.title}
					</Heading>
					<Flex align='center' justify='left' mt={[2, 4]}>
						<NextLink href='/me'>
							<a>
								<Image
									src='/img/personal_picture.jpg'
									alt='author_picture'
									borderRadius='50%'
									width='35px'
								/>
							</a>
						</NextLink>
						{post?.published_at && (
							<Text ml={4} fontSize='xs'>
								{format(new Date(post?.published_at), DATE_FORMAT)}
							</Text>
						)}
						<Link
							href={twitterLink}
							ml={2}
							fontSize={12}
							color='blue.400'
							fontWeight='600'
							target='_blank'
						>
							Share
						</Link>
					</Flex>
					<Flex align='center' justify='left' mt={[2, 4]}>
						{post?.categories?.map((category) => (
							<Category
								name={category?.name!}
								link={category?.link!}
								key={category?.name}
							/>
						))}
					</Flex>
				</Box>

				<Image src={post?.image?.url} width={['50px', '150px']} borderRadius='4px' />
			</Flex>
			<Markdown content={post?.content} />
		</Layout>
	)
})
