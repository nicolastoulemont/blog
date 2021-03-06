import React from 'react'
import { Flex, Image, Link, useColorModeValue, useColorMode, IconButton } from '@chakra-ui/react'
import NextLink from 'next/link'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
export function Header() {
	const { colorMode, toggleColorMode } = useColorMode()
	const bgColor = useColorModeValue('white', '#1A212C')
	const boxShadowColor = useColorModeValue(
		'rgba(0, 0, 0, 0.12) 0px 3px 8px',
		'rgba(0, 0, 0, 1) 0px 3px 8px'
	)

	return (
		<>
			<Flex
				as='header'
				align='center'
				justify='center'
				width='100%'
				boxShadow={boxShadowColor}
				top={0}
				position='sticky'
				zIndex={999}
				bgColor={bgColor}
			>
				<Flex
					as='nav'
					align='center'
					justify='space-between'
					width='100%'
					maxWidth='1000px'
					px={3}
				>
					<NextLink href='/' passHref>
						<Link
							display='flex'
							alignItems='center'
							justifyContent='center'
							_hover={{ textDecor: 'none' }}
						>
							<Image
								src='/img/site-logo.svg'
								fallbackSrc='/img/site-logo.svg'
								alt='website logo'
								width='45px'
							/>
						</Link>
					</NextLink>
					<Flex align='center' justify='center'>
						<NextLink href='/me' passHref>
							<Link py={2} px={3} borderRadius='10px'>
								About
							</Link>
						</NextLink>
						<IconButton
							ml={2}
							bgColor='transparent'
							aria-label='dark / light mode button'
							onClick={toggleColorMode}
							icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						/>
					</Flex>
				</Flex>
			</Flex>
		</>
	)
}
