import React, { Fragment } from 'react'
import { Flex, useColorMode, Image, Tag, PseudoBox } from '@chakra-ui/core'
import Link from 'next/link'
import { shadow } from '@theme/colors'
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
								<a
									href={link.href}
									target='blank'
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										marginRight: '0.5rem'
									}}
								>
									<Tag>
										{link.icon && <PseudoBox as={link.icon} mr={2} />}
										{link.text}
									</Tag>
								</a>
							) : (
								<Link href={link.href} as={link.as}>
									<a
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											marginRight: '0.5rem'
										}}
									>
										<Tag>
											{link.icon && <PseudoBox as={link.icon} mr={2} />}
											{link.text}
										</Tag>
									</a>
								</Link>
							)}
						</Fragment>
					))}
				</Flex>
			)}
		</Flex>
	)
}
