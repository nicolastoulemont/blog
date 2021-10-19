import { CategoriesColorsRegistry } from 'styles/CategoriesColorsRegistry'
import { Flex, Tag } from '@chakra-ui/react'
import React from 'react'
import type { Category } from 'lib/mdx'

interface PostIntroProps {
	date: string
	category: Category | Array<Category>
}

export function PostIntro({ date, category }: PostIntroProps) {
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
				{Array.isArray(category) ? (
					category.map((category, index) => (
						<Tag
							key={category}
							colorScheme={CategoriesColorsRegistry[category]}
							mt={{ base: 2, sm: 0 }}
							ml={index === 0 ? 0 : 2}
						>
							{category}
						</Tag>
					))
				) : (
					<Tag colorScheme={CategoriesColorsRegistry[category]} mt={{ base: 2, sm: 0 }}>
						{category}
					</Tag>
				)}
			</Flex>
		</Flex>
	)
}
