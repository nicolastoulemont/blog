import React from 'react'
import { Flex, Heading, PseudoBox, Text } from '@chakra-ui/core'
import { Card } from '@components/Card'
import { motion } from 'framer-motion'
import { GiHand } from 'react-icons/gi'
import { FaGithub, FaTwitter } from 'react-icons/fa'

const MotionPseudoBox = motion.custom(PseudoBox)

export function Intro() {
	return (
		<Flex
			direction={['column-reverse', 'row']}
			align='center'
			justify={['center', 'space-between']}
			pt={8}
		>
			<Flex direction='column' justify='center' mr={[0, 8]} mt={[8, 0]}>
				<Flex align='center' justify='left' mb={4}>
					<Heading as='h1' size='2xl' fontWeight={600}>
						Hey I'm Nicolas !
					</Heading>
					<MotionPseudoBox
						color='yellow.300'
						fontSize={40}
						ml={2}
						whileHover={{ rotate: [30, 0, 30, 0] }}
						_hover={{ cursor: 'pointer' }}
					>
						<GiHand />
					</MotionPseudoBox>
				</Flex>

				<Text fontSize='xl' textAlign='left'>
					I'm a full stack software developer using Typescript, Node, React and GraphQL.
				</Text>
			</Flex>
			<Card
				img={{ src: '/img/personal_picture.jpg', alt: 'blog_author', width: '200px' }}
				links={[
					{
						text: 'Github',
						href: 'https://github.com/nicolastoulemont',
						external: true,
						icon: FaGithub
					},
					{
						text: 'Twitter',
						href: 'https://twitter.com/NicoToulemont',
						external: true,
						icon: FaTwitter
					}
				]}
			/>
		</Flex>
	)
}
