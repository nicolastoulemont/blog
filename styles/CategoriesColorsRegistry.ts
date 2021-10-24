import type { TagProps } from '@chakra-ui/react'
import type { Category } from 'lib/mdx'
export const CategoriesColorsRegistry: Record<Category, TagProps['colorScheme']> = {
	'Data Structures': 'cyan',
	React: 'red',
	Animations: 'orange',
	GraphQL: 'pink',
	Career: 'blue'
}
