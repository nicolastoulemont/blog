export type Category = 'Data Structures' | 'React' | 'Animations' | 'GraphQL' | 'Career'

export interface PostMetaData {
	title: string
	date: string | 'not_published'
	slug: string
	snippet: string
	description: string
	imagePath: string
	imageAlt: string
	imageWidth: string
	imageHeight: string
	category: Category | Array<Category>
	translation?: string
	translationSlug?: string
}

export type PostMatterData = Pick<
	PostMetaData,
	| 'date'
	| 'description'
	| 'category'
	| 'imageAlt'
	| 'imagePath'
	| 'imageHeight'
	| 'imageWidth'
	| 'snippet'
	| 'title'
	| 'translation'
	| 'translationSlug'
>