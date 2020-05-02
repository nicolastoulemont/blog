import React from 'react'
import { Text, useColorMode } from '@chakra-ui/core'
import { color } from '@theme/colors'

export function Footer() {
	const { colorMode } = useColorMode()

	return (
		<footer>
			<Text>
				Icons made by{' '}
				<a href='https://www.flaticon.com/authors/freepik' title='Freepik'>
					Freepik
				</a>{' '}
				from{' '}
				<a href='https://www.flaticon.com/' title='Flaticon'>
					{' '}
					www.flaticon.com
				</a>
			</Text>
			<style jsx>
				{`
					footer {
						height: 12px;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 10px;
						color: ${color[colorMode]};
						opacity: 0.5;
					}
				`}
			</style>
		</footer>
	)
}
