interface PostMetaData {
	title: string
	date: string
	url: string
	snippet: string
	imagePath: string
	imageAlt: string
	imageWidth: string
	imageHeight: string
	badges: Array<{ text: string; color: string }>
}

export const postsList: Array<PostMetaData> = [
	// {
	// 	title: 'How to build custom plugins for GraphQL Nexus.',
	// 	date: '8th March 2021',
	// 	url: '/posts/2021/nexus-gql-plugins',
	// 	snippet:
	// 		'Exploring how to build typesafe field level plugins to abstract logic with the graphql nexus framework.',
	// 	imagePath: '/img/thumbnail-ts-nexus.png',
	// 	imageAlt: 'GraphQL Nexus and Typescript',
	// 	imageWidth: '388',
	// 	imageHeight: '171',
	// 	badges: [
	// 		{ text: 'Typescript', color: 'blue' },
	// 		{ text: 'GraphQL', color: 'pink' }
	// 	]
	// },
	{
		title: 'Full Stack Typescript - GraphQL: Automate the data layer',
		date: '23th January 2021',
		url: '/posts/2021/full-stack-typescript-graphql-automate-the-data-layer',
		snippet:
			'Exploring how Typescript and GraphQL can be combined across a React / Node stack to give full stack observability, automatically generated documentation and a productivity boost with automatic code generation',
		imagePath: '/img/thumbnail-ts-gql.png',
		imageAlt: 'Typescript and graphql',
		imageWidth: '229',
		imageHeight: '126',
		badges: [
			{ text: 'Typescript', color: 'blue' },
			{ text: 'GraphQL', color: 'pink' }
		]
	},
	{
		title: 'Drag to reorder animations',
		date: '9th January 2021',
		url: '/posts/2021/advanced-animations-drag-to-reorder',
		snippet:
			'Leaning how drag to reorder web animations can be performed with Framer motion and React',
		imagePath: '/img/thumbnail-drag-reorder.png',
		imageAlt: 'Drag to reorder illustration',
		imageWidth: '549',
		imageHeight: '474',
		badges: [
			{ text: 'Animations', color: 'orange' },
			{ text: 'React', color: 'red' }
		]
	},
	{
		title: 'The hashtable',
		date: '5th December 2020',
		url: '/posts/2020/the-hashtable',
		snippet: 'Implementation of a hashtable in Typescript',
		imagePath: '/img/thumbnail-hashtable.png',
		imageAlt: 'Hashtable illustration',
		imageWidth: '1100',
		imageHeight: '375',
		badges: [
			{ text: 'Data structures', color: 'cyan' },
			{ text: 'Typescript', color: 'blue' }
		]
	},
	{
		title: 'The linked list',
		date: '31 May 2020',
		url: '/posts/2020/the-linked-list',
		snippet: 'Implementation of a linked list in Typescript',
		imagePath: '/img/thumbnail-linked-list.png',
		imageAlt: 'Linked list illustration',
		imageWidth: '230',
		imageHeight: '100',
		badges: [
			{ text: 'Data structures', color: 'cyan' },
			{ text: 'Typescript', color: 'blue' }
		]
	},
	{
		title: 'The queue',
		date: '24 May 2020',
		url: '/posts/2020/the-queue',
		snippet: 'Implementation of a queue and priority queue in Typescript',
		imagePath: '/img/thumbnail-queue.png',
		imageAlt: 'Queue illustration',
		imageWidth: '224',
		imageHeight: '173',
		badges: [
			{ text: 'Data structures', color: 'cyan' },
			{ text: 'Typescript', color: 'blue' }
		]
	},
	{
		title: 'The stack',
		date: '19 May 2020',
		url: '/posts/2020/the-stack',
		snippet: 'Implementation of a stack in Typescript',
		imagePath: '/img/thumbnail-stack.jpeg',
		imageAlt: 'Stack illustration',
		imageWidth: '216',
		imageHeight: '187',
		badges: [
			{ text: 'Data structures', color: 'cyan' },
			{ text: 'Typescript', color: 'blue' }
		]
	}
]
