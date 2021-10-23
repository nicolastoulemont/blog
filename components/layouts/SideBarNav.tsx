import React from 'react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import {
	chakra,
	useColorModeValue,
	Link,
	Text,
	UnorderedList,
	ListItem,
	Box,
	useMultiStyleConfig
} from '@chakra-ui/react'
const MotionBox = chakra(motion.div)

const paddingLeftRegistry = {
	h1: 0,
	h2: 0,
	h3: 2,
	h4: 4
} as const

const fontSizeRegistry = {
	h1: 16,
	h2: 16,
	h3: 14,
	h4: 13
} as const

type Header = {
	type: 'h2' | 'h3' | 'h4'
	content: string
	id: string
}

interface SideBarNavProps {
	headers: Array<Header>
	hoverColor?: string
}

export function SideBarNav({ headers, hoverColor }: SideBarNavProps) {
	const titleColor = useColorModeValue('gray.600', 'white')
	const linkColor = useColorModeValue('gray.700', 'white')
	const {
		container: { bg, color }
	} = useMultiStyleConfig('Tag', { colorScheme: hoverColor })

	return (
		<MotionBox
			as='aside'
			pos='fixed'
			top={70}
			right={0}
			maxWidth='290px'
			display={{ base: 'none', '2xl': 'flex' }}
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
