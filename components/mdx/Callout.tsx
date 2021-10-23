import React, { ReactNode } from 'react'
import { Flex, useColorModeValue, Icon, IconProps } from '@chakra-ui/react'
import type { IconType } from 'react-icons'

export function CalloutIcon({ icon, color }: { icon: IconType; color?: IconProps['color'] }) {
	return (
		<Icon
			mr={{ base: 0, sm: 3 }}
			mb={{ base: 3, sm: 0 }}
			mt={{ base: 0, sm: 1 }}
			w={6}
			h={6}
			color={color}
			as={icon}
		/>
	)
}

interface CalloutProps {
	children: ReactNode
	variant?: 'blue' | 'orange' | 'yellow' | 'purple' | 'default'
}

export function Callout({ children, variant = 'default' }: CalloutProps) {
	const variants = {
		blue: useColorModeValue('blue.100', 'blue.700'),
		orange: useColorModeValue('orange.100', 'orange.700'),
		yellow: useColorModeValue('yellow.100', 'yellow.700'),
		purple: useColorModeValue('purple.100', 'purple.700'),
		default: undefined
	}

	return (
		<Flex
			bgColor={variants[variant]}
			p={6}
			borderRadius='xl'
			my={3}
			flexDir={{ base: 'column', sm: 'row' }}
			alignItems={{ base: 'center', sm: 'flex-start' }}
			justifyContent={{ base: 'center', sm: 'flex-start' }}
			textAlign={{ base: 'center', sm: 'left' }}
		>
			{children}
		</Flex>
	)
}
