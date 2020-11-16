import React from 'react'
import { Flex, Image, Link, Box, Tag, TagLeftIcon } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib/cjs'

interface CardProps {
	links?: Array<{ href: string; as?: string; text: string; external?: boolean; icon?: IconType }>
	img?: {
		src: string
		alt: string
		width: string
	}
}

export function Card({ img, links }: CardProps) {
	return (
		<Box
			p={10}
			height='100%'
			borderRadius='4px'
			display='flex'
			flexDirection='column'
			alignItems='flex-start'
			justifyContent='center'
			boxShadow='1px 2px 18px rgba(0,0,0,.1)'
			_hover={{
				transition: 'box-shadow 0.25s ease-in',
				boxShadow: '2px 3px 24px rgba(0,0,0,.1)'
			}}
		>
			{img && (
				<Image
					src={img.src}
					fallbackSrc={img.src}
					alt={img.alt}
					borderRadius='50%'
					alignSelf='center'
					width={img.width}
					mb={8}
				/>
			)}
			{links && (
				<Flex align='center' width='100%' maxWidth='100%' justify='space-between'>
					{links.map((link) => (
						<Link
							key={link.text}
							href={link.href}
							target='blank'
							rel='noreferrer'
							display='flex'
							alignItems='center'
							justifyContent='center'
							mr={2}
						>
							<Tag size='lg'>
								<TagLeftIcon as={link.icon} mr={2} />
								{link.text}
							</Tag>
						</Link>
					))}
				</Flex>
			)}
		</Box>
	)
}
