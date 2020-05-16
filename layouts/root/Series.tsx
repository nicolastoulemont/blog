import React from 'react'
import { useSeriesQuery } from 'generated/graphql'
import { Heading, Box, Text } from '@chakra-ui/core'
import ListItem from '@components/ListItem'

export function Series() {
	const { data } = useSeriesQuery()

	return (
		<Box mt={8} maxHeight='500px' overflowY='auto'>
			<Heading as='h2' size='lg' mb={8} textAlign={['center', 'left']}>
				Series
			</Heading>
			{!data || (data?.series?.length === 0 && <Text>No series yet</Text>)}
			{data?.series?.map((serie) => (
				<ListItem {...(serie as any)} key={serie?.id} />
			))}
		</Box>
	)
}
