import React from 'react'
import { PseudoBox, useColorMode, Flex, Image, Text } from '@chakra-ui/core'
import { hoverColor } from '@theme/colors'
import { Category } from './Category'
import Link from 'next/link'

interface Image {
	url: string
	alternativeText: string
}

interface ItemProps {
	id: string
	slug: string | undefined
	title: string | undefined
	repository_url: string | undefined
	name: string | undefined
	description: string | undefined
	image: Image
	categories:
		| Array<{
				name: string
				link: string
		  }>
		| undefined
}

interface PostOrSerieInfos {
	id: string
	slug: string
	name: string
	title: string
	image: Image
}

function SerieOrPostInfos({ id, slug, image, title, name }: PostOrSerieInfos) {
	return (
		<Link
			href={`/${title ? 'blog' : 'serie'}/[id]/[slug]`}
			as={`/${title ? 'blog' : 'serie'}/${id}/${slug}`}
		>
			<a style={{ display: 'flex', flex: '1' }}>
				<Flex align='center' justify='left' width='100%'>
					<Image
						src={image?.url}
						alt={image?.alternativeText as string}
						borderRadius='4px'
						alignSelf='center'
						width='35px'
						mr={6}
					/>
					{title ? (
						<Text fontWeight='600' fontSize={['md', 'lg']}>
							{title}
						</Text>
					) : name ? (
						<Text fontWeight='600' fontSize={['md', 'lg']}>
							{name}
						</Text>
					) : null}
				</Flex>
			</a>
		</Link>
	)
}

interface RepoInfosProps {
	repository_url: string
	image: Image
	name: string
	description: string
}

function RepoInfos({ repository_url, image, name, description }: RepoInfosProps) {
	return (
		<a
			href={repository_url}
			target='blank'
			rel='noopener'
			style={{ display: 'flex', flex: '1' }}
		>
			<Flex align='center' justify='left' width='100%'>
				<Image
					src={image?.url}
					alt={image?.alternativeText as string}
					borderRadius='4px'
					alignSelf='center'
					width='35px'
					mr={6}
				/>
				<Text fontWeight='600' fontSize={['md', 'lg']} mr={4}>
					{name}
				</Text>
				<Text fontSize={['xs', 'sm']}>{description}</Text>
			</Flex>
		</a>
	)
}

export default function ListItem({
	id,
	slug,
	title,
	repository_url,
	name,
	description,
	image,
	categories
}: ItemProps) {
	const { colorMode } = useColorMode()

	return (
		<PseudoBox
			key={id}
			display='flex'
			alignItems='center'
			justifyContent='space-between'
			py={3}
			px={4}
			mb={4}
			borderRadius='4px'
			_hover={{
				backgroundColor: hoverColor[colorMode]
			}}
		>
			{(title || name) && slug && (
				<SerieOrPostInfos
					id={id}
					title={title as string}
					name={name as string}
					slug={slug}
					image={image}
				/>
			)}
			{name && repository_url && description && (
				<RepoInfos
					repository_url={repository_url}
					name={name}
					image={image}
					description={description}
				/>
			)}

			{categories && categories.length > 0 && (
				<Flex align='center' justify='right' display={['none', 'flex']}>
					{categories?.map((category) => (
						<Category
							key={category?.name.concat('-repos')}
							name={category?.name!}
							link={category?.link!}
						/>
					))}
				</Flex>
			)}
		</PseudoBox>
	)
}