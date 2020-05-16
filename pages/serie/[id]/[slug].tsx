import React from 'react'
import { Layout } from '@components/Layout'
import { Flex, Heading, Image, Box, Text, Link } from '@chakra-ui/core'
import { withApollo } from 'lib/apollo'
import { useSerieQuery } from 'generated/graphql'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { DATE_FORMAT } from 'utils/index'
import NextLink from 'next/link'
import { Category } from '@components/Category'
import ListItem from '@components/ListItem'

export default withApollo(function Serie() {
	const router = useRouter()
	const { id } = router.query
	const { data } = useSerieQuery({ variables: { id: id as string } })
	const serie = data?.serie
	const keywords = serie?.categories?.map((category) => category?.name).join(',')
	const url = `https://nicolastoulemont.dev${router.asPath}`
	const twitterLink = `https://twitter.com/intent/tweet?text=${serie?.name}&url=${url}&via=NicoToulemont&hash=${keywords}`

	return (
		<Layout
			title={serie?.name}
			description={serie?.description}
			keywords={keywords}
			meta={{
				id: serie?.id as string,
				slug: serie?.slug as string,
				image: serie?.image?.url as string
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
						{serie?.name}
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
						{serie?.published_at && (
							<Text ml={4} fontSize='xs'>
								{format(new Date(serie?.published_at), DATE_FORMAT)}
							</Text>
						)}
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
						{serie?.categories?.map((category) => (
							<Category
								name={category?.name!}
								link={category?.link!}
								key={category?.name}
							/>
						))}
					</Flex>
				</Box>
				<Image
					src={serie?.image?.url}
					alt={serie?.image?.alternativeText || 'serie_image'}
					width='150px'
					display={['none', 'block']}
					borderRadius='4px'
				/>
			</Flex>
			<Box mt={8}>
				<Heading as='h2' size='lg' mb={8} textAlign={['center', 'left']}>
					About
				</Heading>
				<Text>{serie?.description}</Text>
			</Box>
			{serie?.posts && serie.posts.length > 0 && (
				<Box mt={8} maxHeight='500px' overflowY='auto'>
					<Heading as='h2' size='lg' mb={8} textAlign={['center', 'left']}>
						Posts
					</Heading>
					{serie.posts.map((post) => (
						<ListItem {...(post as any)} key={post?.title} />
					))}
				</Box>
			)}
			{serie?.repositories && serie.repositories.length > 0 && (
				<Box mt={8} maxHeight='500px' overflowY='auto'>
					<Heading as='h2' size='lg' mb={8} textAlign={['center', 'left']}>
						Repositories
					</Heading>
					{serie.repositories.map((repository) => (
						<ListItem {...(repository as any)} key={repository?.id} />
					))}
				</Box>
			)}
		</Layout>
	)
})
