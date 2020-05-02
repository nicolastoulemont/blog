import React from 'react'
import { Heading, List, ListItem, Image, Text } from '@chakra-ui/core'
import { BlueLink } from '@components/BlueLink'

export function Me() {
	return (
		<>
			<Heading as='h2' mt={10} mb={6} size='lg'>
				Nicolas
			</Heading>
			<List spacing={3}>
				<ListItem display='flex' alignItems='center' justifyContent='left'>
					<Image
						src='/icons/icon-96x96.png'
						alt='computer'
						width='20px'
						minWidth='20px'
						mr={4}
					/>
					<Text>
						Currently works full-time as a software engineer at
						<BlueLink
							href='https://www.linkedin.com/company/carians/about/'
							text='Carians'
						/>
					</Text>
				</ListItem>
				<ListItem display='flex' alignItems='center' justifyContent='left'>
					<Image src='/img/book.png' alt='book' width='20px' minWidth='20px' mr={4} />
					<Text>Has a degree in International Relations and European Union law</Text>
				</ListItem>
				<ListItem display='flex' alignItems='center' justifyContent='left'>
					<Image src='/img/tent.png' alt='tent' width='20px' minWidth='20px' mr={4} />
					<Text>
						Enjoy traveling and went on a year long solo-backpacking trip accross the
						world
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
		</>
	)
}
