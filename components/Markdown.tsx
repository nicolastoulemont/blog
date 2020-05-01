import React from 'react'
import { Box, useColorMode } from '@chakra-ui/core'
import ReactMarkdown from 'react-markdown'
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
				<ReactMarkdown source={content} />
			</div>
		</Box>
	)
}
