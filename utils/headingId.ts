export function generateHeadingId(string) {
	return new String(string).toLowerCase().replace(/\s/g, '-')
}
