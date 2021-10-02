import type { TagProps } from '@chakra-ui/react'

export type Categories = 'Data Structures' | 'React' | 'Animations' | 'GraphQL'

export const CategoriesColorsRegistry: Record<Categories, TagProps['colorScheme']> = {
	'Data Structures': 'cyan',
	React: 'red',
	Animations: 'orange',
	GraphQL: 'pink'
}
