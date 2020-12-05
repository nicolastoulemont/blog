interface PostMetaData {
	title: string
	date: string
	url: string
	snippet: string
	imagePath: string
	badges: Array<{ text: string; color: string }>
}

export const postsList: Array<PostMetaData> = [
	{
		title: 'The hashtable',
		date: '5th December 2020',
		url: '/posts/2020/the-hashtable',
		snippet: 'Implementation of a hashtable in Typescript',
		imagePath: '/img/thumbnail-hashtable.png',
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
		badges: [
			{ text: 'Data structures', color: 'cyan' },
			{ text: 'Typescript', color: 'blue' }
		]
	}
]
