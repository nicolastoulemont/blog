export function generateHeadingId(string) {
	return new String(string)
		.toLowerCase()
		.replace(/[^a-zA-Z ]/g, '')
		.replace(/\s/g, '-')
}
