const withMdxEnhanced = require('next-mdx-enhanced')

module.exports = withMdxEnhanced({
	layoutPath: 'layouts',
	defaultLayout: true,
	fileExtensions: ['mdx'],
	remarkPlugins: [require('remark-slug'), require('remark-code-titles')],
	rehypePlugins: [require('mdx-prism')],
	usesSrc: false,
	extendFrontMatter: {
		process: (mdxContent, frontMatter) => {},
		phase: 'prebuild|loader|both'
	},
	reExportDataFetching: false
})(/* your normal nextjs config */)
