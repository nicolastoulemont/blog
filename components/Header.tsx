import React from 'react'
import NextLink from 'next/link'
import { Flex, Heading, Link, PseudoBox, useColorMode } from '@chakra-ui/core'
import { FaCheck } from 'react-icons/fa'
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

	return (
		<nav style={{ color: color[colorMode], backgroundColor: panelBgColor[colorMode] }}>
			<Flex align='center' justify='space-between' width='66%'>
				<NextLink href='/'>
					<Link
						display='flex'
						alignItems='baseline'
						justifyContent='center'
						_hover={{ textDecor: 'none' }}
					>
						<PseudoBox as={FaCheck} mr={2} fontSize={20} color='green.400' />
						<Heading as='h1' size='lg'>
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
