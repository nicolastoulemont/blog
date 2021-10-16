export function generateHeaderId(string) {
	return new String(string).replace(/\s/g, '-')
}
