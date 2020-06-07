import React, { Fragment } from 'react'
import { Flex, useColorMode, Image, Link, PseudoBox } from '@chakra-ui/core'
import { shadow, shadowHover } from '@theme/colors'
import { IconType } from 'react-icons/lib/cjs'
import { TagWithHover } from './Tag'
import NextLink from 'next/link'

interface CardProps {
	links?: Array<{ href: string; as?: string; text: string; external?: boolean; icon?: IconType }>
	img?: {
		src: string
		alt: string
		width: string
	}
}

export function Card({ img, links }: CardProps) {
	const { colorMode } = useColorMode()

	return (
		<PseudoBox
			p={10}
			height='100%'
			borderRadius='4px'
			display='flex'
			flexDirection='column'
			alignItems='flex-start'
			justifyContent='center'
			boxShadow={shadow[colorMode]}
			_hover={{
				transition: 'box-shadow 0.25s ease-in',
				boxShadow: shadowHover[colorMode]
			}}
		>
			{img && (
				<Image
					src={img.src}
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
						<Fragment key={link.text}>
							{link.external ? (
								<Link
									href={link.href}
									target='blank'
									display='flex'
									alignItems='center'
									justifyContent='center'
									mr={2}
								>
									<TagWithHover size='lg' fontSize={['12px', '14px']}>
										{link.icon && <PseudoBox as={link.icon} mr={2} />}
										{link.text}
									</TagWithHover>
								</Link>
							) : (
								<NextLink href={link.href} as={link.as}>
									<a
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											marginRight: '0.5rem'
										}}
									>
										<TagWithHover size='lg' fontSize={['12px', '14px']}>
											{link.icon && <PseudoBox as={link.icon} mr={2} />}
											{link.text}
										</TagWithHover>
									</a>
								</NextLink>
							)}
						</Fragment>
					))}
				</Flex>
			)}
		</PseudoBox>
	)
}
