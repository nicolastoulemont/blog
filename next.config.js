// const withMDX = require('@next/mdx')({
// 	extension: /\.mdx?$/
// })
// module.exports = withMDX({
// 	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
// })

const withMdxEnhanced = require('next-mdx-enhanced')

module.exports = withMdxEnhanced({
	layoutPath: 'layouts',
	defaultLayout: true,
	fileExtensions: ['mdx'],
	remarkPlugins: [
		require('remark-slug'),
		require('remark-footnotes'),
		require('remark-code-titles')
	],
	rehypePlugins: [require('mdx-prism')],
	usesSrc: false,
	extendFrontMatter: {
		process: (mdxContent, frontMatter) => {},
		phase: 'prebuild|loader|both'
	},
	reExportDataFetching: false
})(/* your normal nextjs config */)
