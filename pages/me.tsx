import React from 'react'
import { Box, Heading, Image, List, ListItem, Text, Link } from '@chakra-ui/react'
import { Header } from 'components'
import { NextSeo } from 'next-seo'

export default function Me() {
	return (
		<>
			<NextSeo title='About me - Nicolas Toulemont' />
			<Header />
			<Box
				as='main'
				width='100%'
				px={{ base: 3, sm: 0 }}
				minHeight='100%'
				maxWidth='1000px'
				margin='0 auto'
				pb={8}
				boxSizing='border-box'
			>
				<Box pt={8}>
					<Heading as='h1' mb={6}>
						About Me
					</Heading>
					<Text my={6}>
						I'm Nicolas Toulemont, a french full stack software developer and former
						jurist. Learning software development is a continuous process, I document
						mine here.
					</Text>
					<Text my={6}>
						I aim to create a distraction-free space to document my projects and
						processes, for myself and anyone interested in using them.
					</Text>
				</Box>
				<Heading as='h2' mt={10} mb={6} size='lg'>
					Nicolas
				</Heading>
				<List spacing={3}>
					<ListItem display='flex' alignItems='center' justifyContent='left'>
						<Image
							src='/icons/icon-96x96.png'
							fallbackSrc='/icons/icon-96x96.png'
							alt='computer'
							width='20px'
							minWidth='20px'
							mr={4}
						/>
						<Text>
							Currently works full-time as a software engineer at
							<Link
								href='https://www.linkedin.com/company/carians/about/'
								target='_blank'
								rel='noreferrer nofollow'
								fontWeight={700}
								color='blue.600'
								textDecoration='underline'
								ml={1}
							>
								Carians
							</Link>
						</Text>
					</ListItem>
					<ListItem display='flex' alignItems='center' justifyContent='left'>
						<Image
							src='/img/book.png'
							fallbackSrc='/img/book.png'
							alt='book'
							width='20px'
							minWidth='20px'
							mr={4}
						/>
						<Text>Has a degree in International Relations and European Union law</Text>
					</ListItem>
					<ListItem display='flex' alignItems='center' justifyContent='left'>
						<Image src='/img/tent.png' alt='tent' width='20px' minWidth='20px' mr={4} />
						<Text>
							Enjoy traveling and went on a year long solo-backpacking trip accross
							the world
						</Text>
					</ListItem>
					<ListItem display='flex' alignItems='center' justifyContent='left'>
						<Image
							src='/img/architecture-and-city.png'
							alt='city'
							width='20px'
							minWidth='20px'
							mr={4}
						/>
						<Text>Lives in Paris, France</Text>
					</ListItem>
				</List>
				<Heading as='h2' mt={10} mb={6} size='lg'>
					Currently Using
				</Heading>
				<List spacing={3}>
					<ListItem display='flex' alignItems='center' justifyContent='left'>
						<Image
							src='/icons/icon-96x96.png'
							fallbackSrc='/icons/icon-96x96.png'
							alt='computer'
							width='20px'
							mr={4}
						/>
						Computer:{' '}
						<Link
							href='https://www.apple.com/macbook-pro-16'
							target='_blank'
							rel='noreferrer nofollow'
							fontWeight={700}
							color='blue.600'
							textDecoration='underline'
							ml={1}
						>
							16" MacBook Pro
						</Link>
					</ListItem>
					<ListItem display='flex' alignItems='center' justifyContent='left'>
						<Image
							src='/img/order.png'
							fallbackSrc='/img/order.png'
							alt='hosting'
							width='20px'
							mr={4}
						/>
						Hosting:{' '}
						<Link
							href='https://vercel.com'
							target='_blank'
							rel='noreferrer nofollow'
							fontWeight={700}
							color='blue.600'
							textDecoration='underline'
							ml={1}
						>
							Vercel
						</Link>
					</ListItem>
					<ListItem display='flex' alignItems='center' justifyContent='left'>
						<Image
							src='/img/code.png'
							fallbackSrc='/img/code.png'
							alt='tent'
							width='20px'
							mr={4}
						/>
						Editor:{' '}
						<Link
							href='https://code.visualstudio.com/'
							target='_blank'
							rel='noreferrer nofollow'
							fontWeight={700}
							color='blue.600'
							textDecoration='underline'
							ml={1}
						>
							VSCode
						</Link>
					</ListItem>
					<ListItem display='flex' alignItems='center' justifyContent='left'>
						<Image
							src='/img/architecture-and-city.png'
							fallbackSrc='/img/architecture-and-city.png'
							alt='city'
							width='20px'
							mr={4}
						/>
						Syntax highlighting:{' '}
						<Link
							href='https://prismjs.com/'
							target='_blank'
							rel='noreferrer nofollow'
							fontWeight={700}
							color='blue.600'
							textDecoration='underline'
							ml={1}
						>
							Prism
						</Link>
					</ListItem>
				</List>
			</Box>
		</>
	)
}
