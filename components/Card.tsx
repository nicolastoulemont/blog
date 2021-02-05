import React from 'react'
import { Flex, Icon, useColorModeValue, Box, chakra, Link, useColorMode } from '@chakra-ui/react'
import { FiTwitter, FiGithub } from 'react-icons/fi'
import NextImage from 'next/image'

export function Card() {
	const { colorMode } = useColorMode()

	const boxShadowColor = useColorModeValue(
		'0px 3px 18px rgba(0,0,0,.1)',
		'0px 3px 18px rgba(0,0,0,1)'
	)

	return (
		<Box
			p={10}
			height='100%'
			rounded='md'
			display='flex'
			flexDirection='column'
			alignItems='flex-start'
			justifyContent='center'
			transition='box-shadow 0.3s ease-in-out'
			boxShadow={boxShadowColor}
		>
			<Flex alignSelf='center' mb={8}>
				<NextImage
					src='/img/personal_picture.jpg'
					width={200}
					height={200}
					priority
					alt='blog author'
					className='avatar'
				/>
				<style>
					{`
							.avatar {
								border-radius:50%;
							}
						`}
				</style>
			</Flex>

			<Flex align='center' width='100%' maxWidth='100%' justify='space-between'>
				<Link
					href='https://twitter.com/NicoToulemont'
					isExternal
					display='flex'
					alignItems='center'
					justifyContent='center'
					mr={2}
					fontSize='16px'
					_hover={{
						color: colorMode === 'light' ? 'blue.600' : 'purple.300'
					}}
				>
					Twitter
					<Icon as={FiTwitter} w='16px' h='16px' ml={2} />
				</Link>
				<Link
					href='https://github.com/nicolastoulemont'
					isExternal
					display='flex'
					alignItems='center'
					justifyContent='center'
					mr={2}
					fontSize='16px'
					_hover={{
						color: colorMode === 'light' ? 'blue.600' : 'purple.300'
					}}
				>
					Github
					<Icon as={FiGithub} w='16px' h='16px' ml={2} />
				</Link>
			</Flex>
		</Box>
	)
}
