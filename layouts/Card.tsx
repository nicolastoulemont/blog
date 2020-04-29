import React from 'react'
import { Flex, useColorMode, Image } from '@chakra-ui/core'
import Link from 'next/link'
import { shadow } from '@theme/colors'

export default function Card() {
	const { colorMode } = useColorMode()

	return (
		<Flex
			p={10}
			height='100%'
			borderRadius='4px'
			direction='column'
			align='flex-start'
			justify='center'
			boxShadow={shadow[colorMode]}
		>
			<Image
				src='/img/personal_picture.jpg'
				alt='profile_picture'
				borderRadius='50%'
				width='200px'
				mb={8}
			/>
			<Flex align='center' width='100%' justify='space-between'>
				<Link href=''>
					<a>Link One</a>
				</Link>
				<Link href=''>
					<a>Link Two</a>
				</Link>
			</Flex>
		</Flex>
	)
}
