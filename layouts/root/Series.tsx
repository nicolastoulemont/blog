import React from 'react'
import { useSeriesQuery } from 'generated/graphql'
import { Heading, Box } from '@chakra-ui/core'
import ListItem from '@components/ListItem'

export function Series() {
	const { data } = useSeriesQuery()
	if (!data || !data.series || data?.series?.length === 0) {
		return <div />
	}

	return (
		<Box mt={8} maxHeight='500px' overflowY='auto'>
			<Heading as='h2' size='lg' mb={8} textAlign={['center', 'left']}>
				Series
			</Heading>
			{data?.series?.map((serie) => (
				<ListItem {...(serie as any)} key={serie?.id} />
			))}
		</Box>
	)
}
