interface Image {
	url: string
	alternativeText: string
}

export interface Serie {
	id: string
	description: string
	slug: string
	name: string
	image: Image
	posts: Array<{ id: string; slug: string; title: string; image: Image }>
}
