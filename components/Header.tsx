import React from 'react'
import NextLink from 'next/link'
import { Flex, Heading, Link, PseudoBox, useColorMode, Image } from '@chakra-ui/core'
import { FiSun, FiMoon } from 'react-icons/fi'
import { color, panelBgColor, hoverColor } from '@theme/colors'

export const DarkModeSwitch = () => {
	const { colorMode, toggleColorMode } = useColorMode()

	const isDark = colorMode === 'dark'
	return (
		<>
			{isDark ? (
				<PseudoBox
					as={FiSun}
					onClick={toggleColorMode}
					fontSize={25}
					_hover={{ cursor: 'pointer', color: isDark && '#fff' }}
					ml={4}
				/>
			) : (
				<PseudoBox
					as={FiMoon}
					onClick={toggleColorMode}
					fontSize={25}
					_hover={{ cursor: 'pointer', fill: '#000' }}
					ml={4}
				/>
			)}
		</>
	)
}

export function Header() {
	const { colorMode } = useColorMode()

	const shadow = {
		light: '1px 2px 18px rgba(0,0,0,.1)',
		dark: '1px 2px 18px rgba(0,0,0,.1)'
	}

	return (
		<nav
			style={{
				color: color[colorMode],
				backgroundColor: panelBgColor[colorMode],
				boxShadow: shadow[colorMode],
				marginBottom: '2rem',
				position: 'sticky',
				width: '100%',
				top: 0
			}}
		>
			<Flex align='center' justify='space-between' width='90%' maxWidth='850px' py={4}>
				<NextLink href='/'>
					<Link
						display='flex'
						alignItems='baseline'
						justifyContent='center'
						_hover={{ textDecor: 'none' }}
					>
						<Image src='/icons/icon-96x96.png' alt='website_icon' width='20px' mr={4} />
						<Heading as='span' size='lg' fontWeight='600'>
							Nicolas Toulemont
						</Heading>
					</Link>
				</NextLink>
				<Flex align='center'>
					<NextLink href='/me'>
						<Link
							_hover={{ bg: hoverColor[colorMode], color: color[colorMode] }}
							py={2}
							px={3}
							borderRadius='10px'
						>
							About
						</Link>
					</NextLink>
					<DarkModeSwitch />
				</Flex>
			</Flex>
		</nav>
	)
}
