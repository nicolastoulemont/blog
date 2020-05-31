import React, { useEffect, useState } from 'react'
import { Layout } from '@components/Layout'
import { Flex, Heading, Image, Box, Text, Link, PseudoBox } from '@chakra-ui/core'
import { withApollo } from 'lib/apollo'
import { usePostQuery } from 'generated/graphql'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { DATE_FORMAT } from 'utils/index'
import ListItem from '@components/ListItem'
import { Markdown } from '@components/Markdown'
import { Category } from '@components/Category'
import { SerieItem } from '@components/SerieItem'
import { Serie } from 'utils/types'
import { IoMdTime } from 'react-icons/io'

export default withApollo(function Post() {
	const [series, setSeries] = useState<Array<Serie>>([])
	const router = useRouter()
	const { id } = router.query
	const { data } = usePostQuery({ variables: { id: id as string } })

	const post = data?.post

	useEffect(() => {
		if (data && !data.post) {
			router.push('/')
		}
	}, [data])

	const keywords = post?.categories?.map((category) => category?.name).join(',')
	const url = `https://nicolastoulemont.dev${router.asPath}`
	const twitterLink = `https://twitter.com/intent/tweet?text=${post?.title}&url=${url}&via=NicoToulemont&hash=${keywords}`

	useEffect(() => {
		if (post?.series && post?.series?.length > 0) {
			const seriesWithOtherPosts = post.series.reduce((arr, serie) => {
				const otherPosts = serie?.posts?.filter((p) => p?.title !== post.title) ?? []
				// @ts-ignore
				otherPosts.length > 0 && arr.push({ ...serie, posts: otherPosts })
				return arr
			}, [])
			setSeries(seriesWithOtherPosts)
		}
	}, [post])

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
					<Heading as='h1' fontSize={'2xl'} fontWeight='600'>
						{post?.title}
					</Heading>
					<Flex align='flex-start' justify='left' mt={[2, 4]}>
						{post?.published_at && (
							<Text fontSize='xs'>
								{format(new Date(post?.published_at), DATE_FORMAT)}
							</Text>
						)}
						<Flex fontSize='12px' align='center' justify='left' ml={2}>
							<PseudoBox as={IoMdTime} mr={1} />
							{post?.content && Math.round(post.content.trim().length / 1500)} min
						</Flex>

						<Link
							href={twitterLink}
							ml={2}
							fontSize={12}
							color='blue.400'
							fontWeight='600'
							target='_blank'
							rel='noopener'
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
								margin='right'
							/>
						))}
					</Flex>
				</Box>

				<Image
					src={post?.image?.url}
					alt={post?.image?.alternativeText || 'post_image'}
					width='150px'
					display={['none', 'block']}
					borderRadius='4px'
				/>
			</Flex>
			{series && series.length > 0 && (
				<>
					<Heading as='h4' fontSize='sm' fontStyle='italic' my='2' fontWeight='600'>
						Part of
					</Heading>
					{series.map((serie) => (
						<SerieItem serie={serie} key={serie.id} />
					))}
				</>
			)}
			<Markdown content={post?.content} />
			{series && series.length > 0 && (
				<>
					<Heading as='h4' fontSize='sm' fontStyle='italic' my='2' fontWeight='600'>
						Part of
					</Heading>
					{series.map((serie) => (
						<SerieItem serie={serie} key={serie.id} />
					))}
				</>
			)}
			{post?.repositories && post.repositories.length > 0 && (
				<>
					<Heading as='h4' fontSize='sm' fontStyle='italic' my='2' fontWeight='600'>
						{post.repositories.length > 1 ? 'Repositories' : 'Repository'}
					</Heading>
					{post.repositories.map((repository) => (
						<ListItem {...(repository as any)} key={repository?.id} />
					))}
				</>
			)}
		</Layout>
	)
})
