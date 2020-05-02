import React from 'react'
import { Box, useColorMode } from '@chakra-ui/core'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'

function CodeBlock({ language, value }: any) {
	return (
		<SyntaxHighlighter language={language} style={tomorrow}>
			{value}
		</SyntaxHighlighter>
	)
}

interface MarkdownProps {
	content?: string
}

export function Markdown({ content }: MarkdownProps) {
	const { colorMode } = useColorMode()

	if (!content) {
		return <div />
	}

	return (
		<Box my={[2, 4]} className='markdown-body'>
			<div className={colorMode}>
				<ReactMarkdown source={content} renderers={{ code: CodeBlock }} />
			</div>
		</Box>
	)
}
