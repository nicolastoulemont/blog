import React from 'react'
import { Heading, List, ListItem, Image } from '@chakra-ui/core'
import { BlueExternalLink } from '@components/BlueExternalLink'

export function Tools() {
	return (
		<>
			<Heading as='h2' mt={10} mb={6} size='lg'>
				Currently Using
			</Heading>
			<List spacing={3}>
				<ListItem display='flex' alignItems='center' justifyContent='left'>
					<Image src='/icons/icon-96x96.png' alt='computer' width='20px' mr={4} />
					Computer:{' '}
					<BlueExternalLink
						href='https://www.apple.com/macbook-pro-16'
						text='16" MacBook Pro'
					/>
				</ListItem>
				<ListItem display='flex' alignItems='center' justifyContent='left'>
					<Image src='/img/order.png' alt='hosting' width='20px' mr={4} />
					Hosting: <BlueExternalLink href='https://vercel.com' text='Vercel' />
					{' - '}
					<BlueExternalLink href='https://www.heroku.com/' text='Heroku' />
				</ListItem>
				<ListItem display='flex' alignItems='center' justifyContent='left'>
					<Image src='/img/code.png' alt='tent' width='20px' mr={4} />
					Editor:{' '}
					<BlueExternalLink href='https://code.visualstudio.com/' text='VS Code' />
				</ListItem>
				<ListItem display='flex' alignItems='center' justifyContent='left'>
					<Image src='/img/architecture-and-city.png' alt='city' width='20px' mr={4} />
					Syntax highlighting:{' '}
					<BlueExternalLink href='https://prismjs.com/' text='PrismJS' />
				</ListItem>
			</List>
		</>
	)
}
