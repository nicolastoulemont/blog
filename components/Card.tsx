import React from 'react'
import { Flex, Link, Box, Tag, TagLeftIcon, useColorModeValue, chakra } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib/cjs'
import NextImage from 'next/image'
import { motion } from 'framer-motion'

const MotionBox = chakra(motion.div)
interface CardProps {
	links?: Array<{ href: string; as?: string; text: string; external?: boolean; icon?: IconType }>
	img?: {
		src: string
		alt: string
	}
}

export function Card({ img, links }: CardProps) {
	const boxShadowColor = useColorModeValue(
		'1px 2px 18px rgba(0,0,0,.1)',
		'1px 2px 18px rgba(0,0,0,1)'
	)
	const boxShadowHoverColor = useColorModeValue(
		'2px 3px 24px rgba(0,0,0,.1)',
		'2px 3px 24px rgba(0,0,0,1)'
	)

	return (
		<MotionBox
			p={10}
			height='100%'
			rounded='md'
			display='flex'
			flexDirection='column'
			alignItems='flex-start'
			justifyContent='center'
			boxShadow={boxShadowColor}
			_hover={{
				transition: 'box-shadow 0.25s ease-in-out',
				boxShadow: boxShadowHoverColor
			}}
		>
			{img && (
				<Flex alignSelf='center' mb={8}>
					<NextImage
						src={img.src}
						width={200}
						height={200}
						priority
						alt={img.alt}
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
			)}
			{links && (
				<Flex align='center' width='100%' maxWidth='100%' justify='space-between'>
					{links.map((link) => (
						<Link
							key={link.text}
							href={link.href}
							isExternal
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
		</MotionBox>
	)
}
