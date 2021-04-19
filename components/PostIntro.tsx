import { Flex, Tag, ThemeTypings } from '@chakra-ui/react'
import React from 'react'

interface PostIntroProps {
	date: string
	tags: Array<{
		name: string
		color: ThemeTypings['colorSchemes'] | (string & {})
	}>
}

export function PostIntro({ date, tags }: PostIntroProps) {
	return (
		<Flex
			width='100%'
			align='center'
			justify={{ base: 'center', sm: 'space-between' }}
			flexDirection={{ base: 'column', sm: 'row' }}
			mb={{ base: 3, md: 6 }}
		>
			Nicolas Toulemont - {date}
			<Flex align='center' justify='center'>
				{tags.map((tag, index) => (
					<Tag colorScheme={tag.color} mt={{ base: 2, sm: 0 }} ml={index === 0 ? 0 : 2}>
						{tag.name}
					</Tag>
				))}
			</Flex>
		</Flex>
	)
}
