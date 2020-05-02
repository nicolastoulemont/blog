import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/core'

export function Bio() {
	return (
		<Box pt={8}>
			<Heading as='h1' mb={6}>
				About Me
			</Heading>
			<Text my={6}>
				I'm Nicolas Toulemont, a french full stack software developer and former jurist.
				Learning software development is a continuous process, I document mine here.
			</Text>
			<Text my={6}>
				I aim to create a distraction-free space to document my projects and processes, for
				myself and anyone interested in using them.
			</Text>
		</Box>
	)
}
