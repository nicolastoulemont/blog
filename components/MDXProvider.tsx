import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MdxTokensMap } from 'styles'

export function MDXWithChakraProvider({ children }) {
	return <MDXProvider components={MdxTokensMap}>{children}</MDXProvider>
}
