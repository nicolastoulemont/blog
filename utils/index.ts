export const isServer = typeof window === 'undefined'
export const imgUrl = (url: string) =>
	process.env.NODE_ENV !== 'development'
		? process.env.API_URL + url
		: 'http://localhost:1337' + url

export const DATE_FORMAT = 'LLLL do, yyyy'
