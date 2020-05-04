import React from 'react'
import { useRepositoriesQuery } from 'generated/graphql'
import { Flex, Image, Heading, Box, Text, Tag, PseudoBox, useColorMode } from '@chakra-ui/core'
import { hoverColor } from '@theme/colors'

export function Repositories() {
	const { colorMode } = useColorMode()
	const { data } = useRepositoriesQuery()

	return (
		<Box mt={8} maxHeight='500px' overflowY='auto'>
			<Heading as='h2' size='lg' mb={8} textAlign={['center', 'left']}>
				Open Source Projects
			</Heading>
			{!data || (data?.repositories?.length === 0 && <Text>No posts yet</Text>)}
			{data?.repositories?.map((repository) => (
				<a href={repository?.repository_url} target='blank' key={repository?.id}>
					<PseudoBox
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
						<Flex align='center' justify='left'>
							<Image
								src={repository?.image?.url}
								alt={repository?.image?.alternativeText as string}
								borderRadius='4px'
								alignSelf='center'
								width='35px'
								mr={6}
							/>
							<Text fontWeight='600' fontSize={['md', 'lg']} mr={4}>
								{repository?.name}
							</Text>
							<Text fontSize={['xs', 'sm']}>{repository?.description}</Text>
						</Flex>
						<Flex align='center' justify='right' display={['none', 'flex']}>
							{repository?.categories?.map((category) => (
								<Tag size='sm' ml={2} key={category?.name}>
									{category?.name}
								</Tag>
							))}
						</Flex>
					</PseudoBox>
				</a>
			))}
		</Box>
	)
}
