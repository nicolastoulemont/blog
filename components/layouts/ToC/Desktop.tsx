import React, { useMemo } from 'react'

import NextLink from 'next/link'
import { useTocHighlight } from 'utils/useTocHightlight'
import { Link, Text, UnorderedList, ListItem, Box, useColorModeValue } from '@chakra-ui/react'
import { MotionBox, spacing, fontSize, useActiveStyles } from './utils'
import type { TocProps, TocLinkProps } from './types'

export function TocDesktop({ elements = [], activeColor }: TocProps) {
	const elementIds = useMemo(() => elements.map((element) => element.id), [elements])
	const titleColor = useColorModeValue('gray.600', 'white')
	const { currentActiveIndex } = useTocHighlight({ elementIds })

	return (
		<MotionBox
			as='aside'
			pos='fixed'
			top={70}
			right={0}
			maxWidth={{ lg: '280px', '2xl': '300px' }}
			display={{ base: 'none', lg: 'flex' }}
			flexDir='column'
			p={6}
			pr={{ lg: 3, '2xl': 6 }}
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
			<Box as='nav' maxHeight='80vh' overflowY='scroll'>
				<UnorderedList listStyleType='none' ml={0} spacing='2'>
					{elements.map((element, index) => (
						<TocLink
							key={`${element.content}${element.id}${index}`}
							element={element}
							activeColor={activeColor}
							isActive={currentActiveIndex === index}
							isFirst={index === 0}
						/>
					))}
				</UnorderedList>
			</Box>
		</MotionBox>
	)
}

function TocLink({ element, activeColor, isActive, isFirst }: TocLinkProps) {
	const defaultColor = useColorModeValue('gray.700', 'white')
	const { bg, color } = useActiveStyles(activeColor)

	return (
		<ListItem ml={spacing[element.type]} display='flex'>
			<NextLink href={`#${element.id}`}>
				<Link
					as='a'
					fontSize={fontSize[element.type]}
					fontWeight='medium'
					// @ts-expect-error
					color={isActive ? color : defaultColor}
					// @ts-expect-error
					bgColor={isActive ? bg : undefined}
					borderRadius='md'
					p={2}
					width='100%'
					transition='background-color 0.2s ease-in-out'
					_hover={{ bg, color }}
				>
					{isFirst ? 'Intro' : element.content}
				</Link>
			</NextLink>
		</ListItem>
	)
}
