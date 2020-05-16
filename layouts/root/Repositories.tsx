import React from 'react'
import { useRepositoriesQuery } from 'generated/graphql'
import { Heading, Box, Text } from '@chakra-ui/core'
import ListItem from '@components/ListItem'

export function Repositories() {
	const { data } = useRepositoriesQuery()

	return (
		<Box mt={8} maxHeight='500px' overflowY='auto'>
			<Heading as='h2' size='lg' mb={8} textAlign={['center', 'left']}>
				Open Source Projects
			</Heading>
			{!data || (data?.repositories?.length === 0 && <Text>No repositories yet</Text>)}
			{data?.repositories?.map((repository) => (
				<ListItem {...(repository as any)} key={repository?.id} />
			))}
		</Box>
	)
}
