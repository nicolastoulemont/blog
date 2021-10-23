export function generateHeaderId(string) {
	return new String(string).toLowerCase().replace(/\s/g, '-')
}
