import React, { useState } from 'react'
import type { HeaderProps } from './SideBarNav'
import { paddingLeftRegistry, fontSizeRegistry } from './SideBarNav'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { FiMenu } from 'react-icons/fi'
import {
	chakra,
	useColorModeValue,
	Link,
	Text,
	UnorderedList,
	ListItem,
	Box,
	useMultiStyleConfig,
	IconButton
} from '@chakra-ui/react'
const MotionBox = chakra(motion.div)

interface MobileNavProps {
	headers: Array<HeaderProps>
	tcolor?: string
}

export function MobileNav({ headers, tcolor }: MobileNavProps) {
	const [showNav, setShowNav] = useState(false)
	const titleColor = useColorModeValue('gray.600', 'white')
	const linkColor = useColorModeValue('gray.700', 'white')
	const {
		container: { bg, color }
	} = useMultiStyleConfig('Tag', { colorScheme: tcolor })

	if (!showNav) {
		return (
			<IconButton
				colorScheme={tcolor}
				icon={<FiMenu />}
				aria-label='Menu'
				pos='fixed'
				bottom={70}
				right='20px'
			/>
		)
	}

	return (
		<MotionBox
			as='aside'
			pos='fixed'
			top={70}
			right={0}
			maxWidth='290px'
			display={{ base: 'flex', '2xl': 'none' }}
			flexDir='column'
			p={6}
			borderRadius={8}
		>
			<Text
				color={titleColor}
				fontSize='md'
				fontWeight='bold'
				style={{ textTransform: 'uppercase' }}
				mb={4}
			>
				On this page
			</Text>
			<Box as='nav'>
				<UnorderedList listStyleType='none' ml={0} spacing='2'>
					{headers.map((header, index) => (
						<ListItem
							key={header.id}
							ml={paddingLeftRegistry[header.type]}
							display='flex'
						>
							<NextLink href={`#${header.id}`}>
								<Link
									as='a'
									fontSize={fontSizeRegistry[header.type]}
									fontWeight='medium'
									color={linkColor}
									borderRadius='md'
									p={2}
									width='100%'
									transition='background-color 0.2s ease-in-out'
									_hover={{
										bgColor: bg,
										color
									}}
								>
									{index === 0 ? 'Intro' : header.content}
								</Link>
							</NextLink>
						</ListItem>
					))}
				</UnorderedList>
			</Box>
		</MotionBox>
	)
}
