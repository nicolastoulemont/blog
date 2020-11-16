import React from 'react'
import { Flex, Image, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

export function Header() {
	return (
		<>
			<Flex
				as='header'
				align='center'
				justify='center'
				width='100%'
				boxShadow='1px 2px 18px rgba(0,0,0,.1)'
				top={0}
				position='sticky'
				backgroundColor='white'
				zIndex={999}
			>
				<Flex as='nav' align='center' justify='space-between' width='90%' maxWidth='1000px'>
					<NextLink href='/' passHref>
						<Link
							display='flex'
							alignItems='center'
							justifyContent='center'
							_hover={{ textDecor: 'none' }}
						>
							<Image
								src='/icons/icon-96x96.png'
								fallbackSrc='/icons/icon-96x96.png'
								alt='website_icon'
								width='20px'
								mr={4}
							/>
							Nicolas Toulemont
						</Link>
					</NextLink>

					<NextLink href='/me' passHref>
						<Link py={2} px={3} borderRadius='10px'>
							About
						</Link>
					</NextLink>
				</Flex>
			</Flex>
		</>
	)
}
